import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { getSlots } from '../../selectors/slots.selectors';
import './index.css';

export default function ViewParking({ areasIds }) {

    const slots = useSelector(getSlots);

    const [selectedAreaId, setSelectedAreaId] = useState(1);
    const [selectedSlots, setSelectedSlots] = useState([]);

    useEffect(() => {
        if (Array.isArray(slots)) {
            selectedArea(selectedAreaId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slots, selectedAreaId]);

    function selectedArea(areaId) {
        setSelectedAreaId(areaId);
        if (Array.isArray(slots)) {
            setSelectedSlots(slots.filter(i => i.areaId === areaId));
        }
    }

    return (
        <div className="view-parking">
            <Row justify={'center'} gutter={[16, 16]}>
                <Col span={6}>
                    <div className='areas'>
                        {areasIds.map((areasId, index) => <Button key={index} onClick={() => selectedArea(areasId)} >Area {index + 1}</Button>)}
                    </div>
                </Col>
                <Col span={18}>
                    <div className='slots'>
                        <Row gutter={[16, 16]}>
                            {selectedSlots.map((slot, arrayIndex) => {
                                const { virtualIndex, isEnabled, isAllocated } = slot;
                                return (
                                    <Col key={arrayIndex} span={6} className={'slot'}>
                                        <div className={cx('slot-inner', {
                                            'slot-hidden': !isEnabled,
                                            'slot-allocated': isAllocated
                                        })}  >
                                            Parking Slot {virtualIndex}
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );


}
