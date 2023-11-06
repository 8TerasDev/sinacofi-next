"use client";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type valueForm = {
    username: string,
    password: string
}
async function fetcher(valueForm: valueForm) {
    try {
        let payload = { ...valueForm }
        let config = {
            method: 'post',
            url: '/api/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        };
        const { data } = await axios(config)
        return data
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const useLoginHook = () => {
    const route = useRouter()

    const { mutate: onSubmit, isPending, isError, isSuccess } = useMutation({
        mutationFn: async (valueForm: valueForm) => await fetcher(valueForm),
        onSuccess: () => {
            console.log('success login')
            route.push('/home')
        },
        onError: (error) => {
            console.log("error login", { error })
            handleCleanForm()
        }
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [valueForm, setValueForm] = useState<valueForm>({
        username: "",
        password: "",
    })

    function handleCleanForm() {
        setValueForm({
            ...valueForm,
            username: "",
            password: "",
        })
    }

    function handleFormChanges(e: any) {
        setValueForm({
            ...valueForm,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        onSubmit(valueForm)
    }

    return ({
        isPending,
        isError,
        isSuccess,
        handleFormChanges,
        handleSubmit,
        showPassword,
        handleClickShowPassword,
        valueForm
    })
}

export default useLoginHook