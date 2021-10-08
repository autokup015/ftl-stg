import React, { useEffect, useState } from 'react'

import { Alert, Button, Input } from 'antd'
import { motion } from 'framer-motion'
import FooterLottery from '../component/footer/FooterLottery'
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from 'axios'

export default function Addlottery({ Toggle, setToggle }) {

    const [NumberLottery, setNumberLottery] = useState('')
    const [status, setStatus] = useState(null)

    useEffect(() => {

        if (NumberLottery != "") {
            setStatus(null)
        }

    }, [NumberLottery])

    const postLottery = async () => {

        const Authorization = await AsyncLocalStorage.getItem("Token")

        let body = {
            target: NumberLottery,
            type: "lottery"
        }

        axios.post('https://staging-ftl.infinityplatform.tech/api/follow',
            body,
            {
                headers: {
                    Authorization: `Bearer ${Authorization}`,
                    Accept: 'application/json'
                }
            })
            .then(() => {
                setStatus(1)
                setNumberLottery('')
                setToggle(!Toggle)
            })
            .catch(err => {
                console.log(err)
                setStatus(2)
                setNumberLottery('')
            })

    }

    return (
        <div>
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                    initial: {
                        opacity: 0,
                    },
                    animate: {
                        opacity: 1,
                    },
                }}
            >
                <div className="max-w-screen-md m-auto">
                    <h1 className="text-center pt-5" style={{ fontSize: 18 }}>
                        สลากกินแบ่งรัฐบาล
                    </h1>
                    <div className="text-center">
                        <Input className="text-center mt-3" style={{ width: 250 }} type='number'
                            onChange={e => setNumberLottery(e.target.value)}
                            value={NumberLottery}
                        />
                        <br />
                        <br />
                        <Button shape="round" type="primary" onClick={postLottery}>เพิ่มสลากฯ</Button>
                    </div>
                    <br />

                    {status == 1 &&
                        <Alert message="เพิ่มเลขของคุณเข้าระบบแล้วค่ะ" type="success" showIcon style={{ width: 250, margin: 'auto' }} />
                    }
                    {status == 2 &&
                        <Alert message="รบกวนตรวจสอบตัวเลขใหม่ค่ะ" type="error" showIcon style={{ width: 250, margin: 'auto' }} />
                    }

                </div>
            </motion.div>
            <FooterLottery />
        </div>
    )
}