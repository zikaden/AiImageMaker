import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";
import { getRandomPrompt } from "../utils";
import FormField from "../components/FormField";
import Loader from "../components/Loader"

function CreatePost() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })

    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                setForm({ ...form, photo: `data:image/png;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const name = form.name
                const promptDalle = form.prompt
                const photo = form.photo
                const payload = {
                    name: name, prompt: promptDalle, photo: photo
                };
                var data = new FormData();
                data.append("json", JSON.stringify(payload));
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });
                await response.json()
                navigate('/');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    }

    return (
        <section className="max-w-5xl mx-auto">
            <div>
                <h1 className="font-extrabold text-gray-700 text-xl">Create
                </h1>
                <p className="mt-2 text-bs text-gray-400 max-w-screen-lg">Create stunning images through DALLE-AI and share them with the community.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
                <div className="flex flex-col gap-5">
                    <FormField
                        LabelName="Your name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        LabelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder=''
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="realative bg-gray-50 text-gray-400 shadow text-sm rounden-lg focus:ring-[#fc73e6] focus-border-[#fc73e6] w-64 h-64 p-3 flex justify-center items-center">
                        {form.photo ? (
                            <img src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain" />
                        ) : (
                            <img src={preview}
                                alt="preview"
                                className="w-9/12 h-9/12 object-contain opacity-30"
                            />
                        )}
                        {generatingImg && (
                            <div className='absolute flex justify-center items-center w-full rounded-lg opacity-40'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="text-white bg-gray-500 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center shadow "
                    >
                        {generatingImg ? 'Generating ...' : 'Generate'}
                    </button>
                </div>
                <div className="mt-10">
                    <p className="mt-2 text-gray-400 text-bs">Ones you have created an image you like, you can share ist with others in the community.</p>
                    <button
                        type="submit"
                        className='mt-3 mb-3 text-white bg-gray-500 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center shadow '>
                        {loading ? 'Sharing ...' : 'Share with the community'}

                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost