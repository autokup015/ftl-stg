import { motion } from 'framer-motion'
import React from 'react'
import CardLottery from '../component/card/CardLottery'
import FooterLottery from '../component/footer/FooterLottery'

export default function lottery({ data, Toggle, setToggle }) {

    const cloneData = [...data]

    let NewDataLottery = cloneData.filter(data => {
        return data.type == 'lottery'
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
                    {NewDataLottery && NewDataLottery.map((item, index) => {
                        return <CardLottery key={index} bgcolor="#A569BD" item={item} Toggle={Toggle} setToggle={setToggle} />
                    })}

                </div>
            </motion.div>
            <div style={{ paddingBottom: 80 }}></div>
            <FooterLottery />
        </div>
    )
}
