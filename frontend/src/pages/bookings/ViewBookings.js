import { Col, Row, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getBookingsRequest } from '../../api/booking.api';
import useApi from '../../hooks/useApi';
import './index.css';

export default function ViewBookings() {

    const [bookings, setBookings] = useState([]);

    const [{
        loading: loadingGetBookings,
        data: dataGetBookings,
        isSuccess: isSuccessGetBookings
    }, executeGetBookingsApi] = useApi();

    useEffect(() => {
        executeGetBookingsApi(getBookingsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSuccessGetBookings === true && Array.isArray(dataGetBookings)) {
            setBookings(dataGetBookings);
        }
    }, [dataGetBookings, isSuccessGetBookings]);


    const columns = [
        {
            title: 'Area',
            dataIndex: 'areaId',
            key: 'areaId',
            render: (text) => <>Area {text}</>,
        },
        {
            title: 'Spot',
            dataIndex: 'slot',
            key: 'slot',
            render: (slot) => <>Spot {slot.virtualIndex}</>,
        },
        {
            title: 'Date',
            dataIndex: 'timeFrom',
            key: 'timeFrom',
            render: (timeFrom) => <>{moment(timeFrom).format('YYYY-MM-DD')}</>,
        },
        {
            title: 'Start',
            dataIndex: 'timeFrom',
            key: 'timeFrom',
            render: (timeFrom) => <>{moment(timeFrom).format('HH:mm')}</>,
        },
        {
            title: 'End',
            dataIndex: 'timeTo',
            key: 'timeTo',
            render: (timeFrom) => <>{moment(timeFrom).format('HH:mm')}</>,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration'
        }
    ];

    return (
        <div className="view-bookings">
            <Spin spinning={loadingGetBookings} >
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table columns={columns} dataSource={bookings} loading={loadingGetBookings} />
                    </Col>
                </Row>
            </Spin>
        </div>
    );


}
