import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';

import ViewParking from './ViewParking';
import BookParking from './BookParking';
import ViewBookings from './ViewBookings';

import { useAppDispatch } from '../../store';
import { fetchSlots } from '../../reducers/thunks/slots.thunk';
import { useSelector } from 'react-redux';
import { getSlotsLoading } from '../../selectors/slots.selectors';

import './index.css';

const LAYOUT_KEY_VIEW_PARKING = 'view-parking';
const LAYOUT_KEY_BOOK_PARKING = 'book-parking';
const LAYOUT_KEY_VIEW_BOOKINGS = 'view-bookings';

export default function Login() {

    const dispatch = useAppDispatch();
    
    const isSlotsFetching = useSelector(getSlotsLoading);

    const [currentLayout, setCurrentLayout] = useState(LAYOUT_KEY_VIEW_PARKING);
    const [areasIds] = useState([1, 2, 3]);

    useEffect(() => {
        dispatch(fetchSlots());
    }, [dispatch])

    return (
        <div className="booking">
            <Spin spinning={isSlotsFetching}>
                <div className='buttons'>
                    <Button onClick={() => setCurrentLayout(LAYOUT_KEY_VIEW_PARKING)}>View parking</Button>
                    <Button onClick={() => setCurrentLayout(LAYOUT_KEY_BOOK_PARKING)}>Book parking</Button>
                    <Button onClick={() => setCurrentLayout(LAYOUT_KEY_VIEW_BOOKINGS)}>View bookings</Button>
                </div>
                <div>
                    {currentLayout === LAYOUT_KEY_VIEW_PARKING && <ViewParking areasIds={areasIds} />}
                    {currentLayout === LAYOUT_KEY_BOOK_PARKING && <BookParking areasIds={areasIds} />}
                    {currentLayout === LAYOUT_KEY_VIEW_BOOKINGS && <ViewBookings  />}
                </div>
            </Spin>
        </div>
    );

}
