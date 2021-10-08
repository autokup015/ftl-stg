import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

// Import ant design
import { Select } from 'antd';
const { Option } = Select;

export default function Navbar({ setSelectItem }) {

    const router = useRouter()

    function handleChange(value) {
        if (value == 'fiction') {
            router.push('/')
        } else {
            router.push('/lottery')
        }
    }


    return (
        <div style={{ backgroundColor: '#193EB8', padding: 16 }}>

            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Prompt:100,300,400,500,700,900"
                />

                <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>

                <title>FTL - STG</title>
            </Head>

            <div className="max-w-screen-md m-auto">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: 24, color: 'white' }}>
                        FTL-STG
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Select defaultValue="fiction" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="fiction">นิยาย</Option>
                            <Option value="lottery">สลากกินแบ่งรัฐบาล</Option>
                        </Select>
                    </div>
                </div>
            </div>

        </div>
    )
}
