import React, { useEffect, useState } from 'react'

import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import '../styles/antfix.css'

import Navbar from '../component/Navbar'
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from 'axios'

export default function Myapp({ Component, pageProps }) {

  const [data, setData] = useState([])
  const [Toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {

    await liff.init({ liffId: "1656217629-QKGVoxvy" })

    if (liff.isLoggedIn()) {

      getData()

    } else {
      liff.login()
    }

  }, [Toggle])


  const getData = async () => {

    const getToken = await AsyncLocalStorage.getItem('Token')

    const Authorization = getToken

    axios.get('https://staging-ftl.infinityplatform.tech/api/follow/all', {
      headers: {
        Authorization: `Bearer ${Authorization}`,
        Accept: 'application/json'
      }
    })
      .then(result => {
        setData(result.data)
        setLoading(true)
      })
      .catch(err => {
        console.log(err)
        SaveToken()
      })

  }


  const SaveToken = () => {

    let getAccessToken = liff.getAccessToken()
    let getIdToken = liff.getIDToken()

    let body = {
      "provider": "line",
      "payload": {
        "access_token": getAccessToken,
        "id_token": getIdToken
      },
      "auto_register": true
    }

    axios.post('https://staging-ftl.infinityplatform.tech/api/auth', body)
      .then(result => {
        let token = result.data.token
        AsyncLocalStorage.setItem('Token', token)
        getData()
      })
      .catch(err => {
        console.log(err)
        window.location.reload()
      })

  }


  return (
    <div>
      <Navbar />
      <Component
        {...pageProps}
        data={data}
        Toggle={Toggle}
        setToggle={setToggle}
        loading={loading}
      />
    </div>
  )
}
