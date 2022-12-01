import { useEffect } from 'react';
import { Button, Col, Row, Spin, Select, Form, DatePicker } from 'antd';
import moment from 'moment';
import { createBookingRequest } from '../../api/booking.api';
import useApi from '../../hooks/useApi';
import { getSlots } from '../../selectors/slots.selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchSlots } from '../../reducers/thunks/slots.thunk';

import './index.css';

const { Option } = Select;
const { useForm } = Form;

export default function BookBooking({ areasIds }) {

    const dispatch = useAppDispatch();
    const slots = useSelector(getSlots);

    const [form] = useForm();

    const [{
        loading: loadingCreateBooking,
        data: dataCreateBooking,
        isSuccess: isSuccessCreateBooking
    }, executeCreateBookingApi] = useApi();

    useEffect(() => {
        if (isSuccessCreateBooking === true && dataCreateBooking.id) {
            dispatch(fetchSlots());
            form.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, dataCreateBooking, isSuccessCreateBooking]);

    function handleSubmit(values) {
        executeCreateBookingApi(createBookingRequest(values));
    }

    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 20 },
    };
    console.log(form)
    return (
        <div className="book-parking">
            <Spin spinning={loadingCreateBooking}>
                <Row span={16} justify={'center'}>
                    <Col xs={24} sm={24} md={20} lg={20} xl={18} xxl={16}>
                        <Form
                            name="basic"
                            form={form}
                            {...formItemLayout}
                            onFinish={handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={'areaId'} label="Area" rules={[{ required: true, message: 'Please select a area!' }]}>
                                        <Select placeholder="Please select a area">
                                            {areasIds.map((i, index) => (<Option key={index} value={i}>Area {i}</Option>))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, currentValues) => prevValues.areaId !== currentValues.areaId}
                                    >
                                        {({ getFieldValue }) => {
                                            const areaId = getFieldValue('areaId');
                                            return (
                                                <Form.Item
                                                    name={'slotId'}
                                                    label="Spot"
                                                    rules={[{ required: true, message: 'Please select a spot!' }]}
                                                >
                                                    <Select placeholder="Please select a spot">
                                                        {slots
                                                            .filter(i => i.isEnabled && i.areaId === areaId)
                                                            .map((i, index) => (
                                                                <Option key={index} value={i.id} disabled={i.isAllocated}>Parking spot {i.virtualIndex} {(i.isAllocated? '(reserved)': '')}</Option>
                                                            ))}
                                                    </Select>
                                                </Form.Item>
                                            )
                                        }}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={'timeFrom'} label="Time from" rules={[{ required: true, message: 'Please select start time!' }]}>
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={(current) => {
                                            let customDate = moment().format("YYYY-MM-DD");
                                            return current && current < moment(customDate, "YYYY-MM-DD");
                                        }} />

                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={'timeTo'} label="Time to" rules={[{ required: true, message: 'Please select end time!' }]}>
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={(current) => {
                                            let customDate = moment().format("YYYY-MM-DD");
                                            return current && current < moment(customDate, "YYYY-MM-DD");
                                        }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={'center'}>
                                <Col xs={16} sm={12} md={10} lg={8} xl={8} xxl={8}>
                                    <Button type="primary" size='large' htmlType="submit" className='btn-book-parking'>
                                        Book parking
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Spin>
        </div>
    );


}
