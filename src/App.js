import { useEffect, useState, useCallback } from "react";

const App = () => {
    const [qrImage, setQrImage] = useState(null);
    const [qrText, setQrText] = useState(null);
    const [loading ,setLoading] = useState(false);
    const handleChange = useCallback(async e => {
        setQrText(e.target.value);

    }, [qrText]);
    const getQrImage = async () => {
        setLoading(true);
        await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${qrText}&size=150x150`)
            .then(res => res.blob())
            .then(blob => {
              
                const objectURL = URL.createObjectURL(blob);
                setQrImage(objectURL);
                setLoading(false);
            }
            );
    }

    return <div className="w-screen h-screen screen bg-red-500">
        <div className="flex justify-center items-center h-screen">
            <div className="w-auto bg-white p-10 shadow-2xl">

                <input
                    onChange={handleChange}
                    className="w-full border border-gray-400 p-2"
                    type="text"
                    placeholder="Enter the text to generate qr code." />
                <button
                    onClick={getQrImage}
                    disabled={loading}
                    className={`${loading ? 'bg-gray-400 hover:bg-gray-500':"bg-blue-500 hover:bg-blue-700 "} 
                     w-full mt-5 
                     text-white font-bold py-2 px-4 rounded-3xl`}>
                    {
                        loading ? "Loading..." : "Generate QR Code"
                    }
                </button>
                {
                    qrImage && <div className="border border-gray-400 mt-5 flex items-center justify-center p-5">
                        <img src={qrImage} />
                    </div>
                }

            </div>
        </div>

    </div>
}
export default App;