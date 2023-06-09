import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import NFTBox from "../Components/NFTBox";
import SpinWheel from "../Components/spinWheel";

function MyNFT() {

    const { contract, userAccount } = useContext(MainContext);
    const [data, setData] = useState('');

    useEffect(() => {
        async function getNFT() {
            const length = await contract.methods.getDatabaseLength(userAccount).call();
            const images = [];
            for (let i = 0; i < length; i++) {
                const details = await contract.methods.database(userAccount, i).call();
                images.push(<NFTBox URL={details[1]} Title={details[0]} />)
            }
            setData(images)
        }
        contract && getNFT()
    }, [contract, userAccount])
    return (
        <>
            <div id="allNFT">
                {data ?
                    data
                    :
                    <SpinWheel />
                }
            </div>
        </>
    )
}

export default MyNFT;