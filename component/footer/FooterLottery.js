import { Button } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'

import Style from '../../styles/Footer.module.css'

export default function FooterLottery() {

    const router = useRouter()

    return (

        <div className={Style.fixfooter}>

            <Button block type="text" style={{ height: 60 }} onClick={() => router.push('/lottery')}>
                <img className="m-auto" src="/main.png" width={20} />
                <p className="text-xs mt-1 mb-1" style={{ color: 'white', fontSize: 11 }}>
                    หน้าแรก
                </p>
            </Button>

            <Button block type="text" style={{ height: 60 }} onClick={() => router.push('/addlottery')}>
                <img className="m-auto" src="/add.png" width={18} />
                <p className="text-xs mt-1 mb-1" style={{ color: 'white', fontSize: 11 }}>
                    เพิ่มสลากกินแบ่งรัฐบาล
                </p>
            </Button>

        </div>

    )
}
