function SpinWheel() {
    return (
        <>
            <div id="spinWheelcontainer">
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                                floodColor="#646cff" />
                        </filter>
                    </defs>
                    <circle id="spinner" cx="50" cy="50" r="15" />
                </svg>
            </div>
        </>
    )
}

export default SpinWheel;