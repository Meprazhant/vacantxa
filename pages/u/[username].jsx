import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { BsFillPencilFill } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import Cv from '../../compos/user/Cv'


function user() {
    var session = useSession()
    var addr = '-------------'
    var [data, setData] = useState({})
    var router = useRouter()

    function getUser(email) {
        fetch(`/api/user/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(res => res.json())
            .then(data => {
                setData(data.data)
                console.log(data)
            })
    }



    useEffect(() => {
        if (session.status == 'loading') {
            // Loading
        } else if (session.status == 'authenticated') {
            getUser(session.data.user.email)
            setData(session.data.user)
        } else if (session.status == 'unauthenticated') {
            router.push("/auth/join")
        }
    }, [session]
    )

    return (
        <div className='user'>
            <Head>
                <title>{data.name} | Vacantxa</title>
            </Head>
            <div className='userCard'>
                <div className="uc-top">
                    <div className="ut-data">
                        <div className="uc-img">
                            <img src={data.image} alt={data.name} referrerPolicy="no-referrer" />
                        </div>
                        <div className="uc-name">
                            <h1>{data.name}</h1>
                            <p><GoLocation /> {data.address || addr}</p>
                        </div>
                    </div>
                    <div className="ut-btn">
                        <button onClick={() => {
                            router.push("/u/[username]/edit", "/u/" + data._id + "/edit")
                        }} >Profile Settings</button>
                        <button onClick={() => signOut()}>Sign Out</button>
                    </div>
                </div>
                <div className="uc-data">
                    <div className="ud-left">
                        <div className="udl-item">
                            <h1>Phone
                                <BsFillPencilFill />
                            </h1>
                            <p>{data.phone}</p>
                        </div>
                        <div className="udl-item">
                            <h1>Address</h1>
                            <p>{data.address || addr}</p>
                        </div>
                        <div className="udl-item">
                            <h1>Preferred Subject</h1>
                            <p>{data.subject}</p>
                        </div>
                    </div>
                    {/* <div className="ud-cv">
                        <h1>Your CV generated by Vacantxa</h1>
                        <Cv data={data} />
                    </div> */}


                </div>

            </div>

        </div>
    )
}

export default user