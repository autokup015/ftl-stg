import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'antd'
import Styles from '../../styles/CardFictions.module.css'
import axios from 'axios';
import AsyncLocalStorage from '@createnextapp/async-local-storage'

export default function CardFiction({ bgcolor, item, Toggle, setToggle }) {

    const [checkId, setCheckId] = useState('')

    const openLink = (link) => {

        liff.openWindow({
            url: link,
            external: true,
        });

    };

    const sharedMsg = async (value) => {
        await liff.shareTargetPicker([
            {
                type: 'text',
                text: 'ติดตามนิยาย ' + value.title + " ไม่พลาดทุกการอัพเดตเพียงกดลิงก์เพิ่อรับการแจ้งเตือนตอนใหม่แบบฉับไวผ่าน FTL" + '\n' + '\n' + '<Liff link>' + value.target
            }
        ])
    }

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
            .then(() => {
                setToggle(!Toggle)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className={Styles.card}>

            <Row>
                <Col span={10}>
                    <div className={Styles.tap} style={{ backgroundColor: bgcolor }}>
                    </div>
                    <div className='p-5 pr-0'>
                        <img className={Styles.img} src={item.img_url} width={200} />
                    </div>
                </Col>
                <Col span={14}>

                    <Card style={{ height: '100%', width: '100%' }}>

                        <h1 className="textover" style={{ fontSize: 18 }}>{item.title}</h1>
                        <h2 className="text-gray-400 textover" style={{ fontSize: 13 }} >{item.website}</h2>

                        <div className={Styles.buttonAbsolute} >
                            <Button
                                className={Styles.button}
                                style={{ background: 'linear-gradient(180deg, #6790FF 0%, #0037CC 100%)' }}
                                shape="round"
                                type="primary"
                                onClick={() => openLink(item.target)}
                            >
                                อ่าน
                            </Button>
                            <Button
                                className={Styles.button}
                                style={{ marginLeft: '4%', marginRight: '7%', background: '#FF5B5B' }}
                                shape="round"
                                type="primary"
                                onClick={() => remove(item.id)}
                                disabled={checkId == item.id ? true : false}
                            >
                                ลบ
                            </Button>
                            <img src="/shared.png" onClick={() => sharedMsg(item)} width={20} height={20} />
                        </div>

                    </Card>

                </Col>
            </Row>
        </div>
    )
}