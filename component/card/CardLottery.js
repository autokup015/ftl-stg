import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'antd'

import Styles from '../../styles/CardFictions.module.css'
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from 'axios'

export default function CardLottery({ bgcolor, item, Toggle, setToggle }) {

    const [checkId, setCheckId] = useState('')

    const remove = async (id) => {

        setCheckId(id)

        const Authorization = await AsyncLocalStorage.getItem("Token")

        let body = {
            id: id,
            status: 0
        }

        axios.patch('https://staging-ftl.infinityplatform.tech/api/follow',
            body,
            {
                headers: {
                    Authorization: `Bearer ${Authorization}`,
                    Accept: 'application/json'
                }
            })
            .then((result) => {

                if (result.data) {
                    setToggle(!Toggle)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>

            <div className={Styles.card}>

                <Row>
                    <Col span={10}>

                        <div className={Styles.tap} style={{ backgroundColor: bgcolor }}>
                        </div>
                        <div className='p-5 pr-0'>
                            <img className={Styles.img} src='/h.png' width={200} />
                        </div>

                    </Col>

                    <Col span={14}>

                        <Card style={{ height: '100%', width: '100%' }}>

                            <h1 className="textover" style={{ fontSize: 18 }}>สลาก : {item.additional_data.lotteryCode}</h1>
                            <h2 className="text-gray-400 textover" style={{ fontSize: 13 }} >งวดวันที่ : {item.additional_data.lotteryDate}</h2>

                            <div className={Styles.buttonAbsolute} >
                                <Button
                                    className={Styles.button}
                                    style={{ background: '#FF5B5B' }}
                                    shape="round"
                                    type="primary"
                                    onClick={() => remove(item.id)}
                                    disabled={checkId == item.id ? true : false}
                                >
                                    ลบ
                                </Button>
                            </div>

                        </Card>

                    </Col>

                </Row>
            </div>
        </div>
    )
}