function NFTBox(props) {
    const { URL, Title } = props;
    return (
        <>
            <div className="NFTBox">
                <img src={URL} alt="" />
                <h3>{Title}</h3>
            </div>
        </>
    )
}

export default NFTBox;