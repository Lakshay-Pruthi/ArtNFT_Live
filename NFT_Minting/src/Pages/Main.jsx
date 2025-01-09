import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react'
import Data from '../../contract/Data.json'
import { useEffect, useState } from 'react';

export const MainContext = createContext()



function Main() {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null)
    const [userAccount, setUserAccount] = useState('');


    if (window.ethereum) {
        ethereum.on("accountsChanged", () => {
            setUserAccount();
        });

        ethereum.on('chainChanged', (_chainId) => window.location.reload());

        useEffect(() => {
            async function loadContract() {
                const contract = new web3.eth.Contract(Data.abi, '0x5f97773E6d8197e170DFD14F10A03c96D8955eEe');
                console.log(contract.methods);
                setContract(contract);
            }
            web3 && loadContract();
        }, [web3])

        useEffect(() => {
            async function getUserDetails() {
                const _users = await web3.eth.getAccounts();
                console.log(_users);
                setUserAccount(_users[0].toLowerCase());
            }
            web3 && getUserDetails();
        }, [web3, userAccount]);
    }

    return (
        <>
            <MainContext.Provider value={{ web3, setWeb3, contract, userAccount }}>
                <Navbar />
                <Outlet />
                <Footer />
            </MainContext.Provider>
        </>
    )
}
export default Main;