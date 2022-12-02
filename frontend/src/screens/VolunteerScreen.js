import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Request from '../components/Request'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listRequests } from '../actions/ngoRequestActions'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdGh5YW5hbmRha3VtYXIiLCJhIjoiY2xiNWZ4YTRoMDJpYTNvdW50ZnAzZWxydCJ9.1ZmZsWgHfQmY9TLxI_lqPA';//ENV!!

const VolunteerScreen = ({ history, match }) => {
    const mapContainer = useRef(null);
    const keyword = match.params.keyword
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    
    const pageNumber = match.params.pageNumber || 1
    
    const dispatch = useDispatch()

    const requestList = useSelector((state) => state.requestList)
    const { loading, error, requests, page, pages } = requestList

    useEffect(() => {
        dispatch(listRequests(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });
        });
    

    return (
        <>
            <Meta />
            <h5>Pickup Required</h5>
            <div>
                    <div ref={mapContainer} className="map-container" />
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {requests.reverse().map((request) => (
                            <Col key={request._id} sm={12} md={6} lg={4} xl={3}>
                                <Request request={request} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                    

                </>
            )}
        </>
    )
}

export default VolunteerScreen
