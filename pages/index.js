import React from 'react'
import { FilterOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu, Space } from 'antd'

import CardFiction from '../component/card/CardFiction'
import Footer from '../component/footer/Footer'
import Style from '../styles/Home.module.css'

import { motion } from 'framer-motion'

export default function index({ data, Toggle, setToggle, loading }) {

  const cloneData = [...data]

  let NewDataFiction = cloneData.filter(data => {
    return data.type !== 'lottery'
  })

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
          <div className="p-5 pb-0 relative w-full">
            <Input
              style={{ marginRight: 10, borderColor: 'gray' }}
              placeholder="Search"
              width={100}
              prefix={<SearchOutlined />}
            />
            <div className="absolute" style={{ top: 20, right: 20 }}>
              <Filter />
            </div>
          </div>

          <div style={loading ? { display: 'none' } : {}}>
            <div style={{ marginTop: '20%', textAlign: 'center' }}>
              <LoadingOutlined style={{ fontSize: 30 }} />
            </div>
          </div>


          {loading && NewDataFiction.length == 0 &&
            <div style={{ marginTop: '20%', textAlign: 'center' }}>
              <h1 style={{ fontSize: 20, color: 'gray' }}>No data</h1>
            </div>
          }


          {/* Render component */}
          {NewDataFiction &&
            NewDataFiction.map((item, index) => {
              return <CardFiction key={index} bgcolor='#52be80' item={item} Toggle={Toggle} setToggle={setToggle} />
            })
          }
        </div>
      </motion.div>
      <div style={{ paddingBottom: 80 }}></div>
      <Footer />
    </div>

  )
}


export const Filter = () => {

  const menu = (

    <Menu>
      <Menu.Item key='0'>
        <p className="text-center">
          blank
        </p>
      </Menu.Item>
      <Menu.Item key='1'>
        <p className="text-center">
          blank
        </p>
      </Menu.Item>
    </Menu>

  );

  return (

    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Button className={Style.filtermenu} type="text">
        <FilterOutlined />
      </Button>
    </Dropdown>

  )
}