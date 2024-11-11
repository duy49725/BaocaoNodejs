import React, { useEffect, useState } from 'react';
import { GetCountries, IpAddress, SendEmail } from '@/components/config/api';
import { validateEmail, validateFullName, validateMessage, validatePhone } from '@/components/config/validation';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { toast, useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

function InlineError({ error }) {
    return (
        <p className="text-center mt-2 my-1 text-sm text-red-600 font-subMain font-medium">{error}</p>
    );
}

const Contact = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState('');
    const [fullNameError, setFullNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneError, setPhoneError] = useState();
    const [messageError, setMessageError] = useState();
    const [loading, setLoading] = useState(true);
    const [ipData, setIpData] = useState();
    const [countries, setCountries] = useState();
    const [country, setCountry] = useState('Viet Nam');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [send, setSend] = useState();
    let result = countries && Object.keys(countries).map((key) => countries[key]);
    let output = result && result.find((x) => x.country_name === country);
    let outputResult = output && output.dialling_code;
    let phoneFull = outputResult && outputResult.concat(phone);
    const { toast } = useToast();

    useEffect(() => {
        if (!ipData && !countries) {
            IpAddress({ setLoading, setIpData });
            GetCountries({ setLoading, setCountries });
        }
        validateFullName({ fullName, setFullNameError });
        validateEmail({ email, setEmailError });
        validatePhone({ phone, setPhoneError });
        validateMessage({ message, setMessageError });

        if (send) {
            toast({ title: "Send message successfully" });
            setFullName("");
            setEmail("");
            setMessage("");
            setSend();
            setPhone("");
        }
    }, [fullName, email, phone, message, send, ipData, countries]);

    const submitHandler = (e) => {
        e.preventDefault();
        setButtonLoading(true);
        if (!fullNameError && !emailError && !phoneError && !messageError) {
            SendEmail({ fullName, email, phone: phoneFull, message, setSend }).then(() => {
                setButtonLoading(false);
            });
        }
    };

    return (
        <div className='bg-slate-100 w-full p-20 flex items-center justify-center'>
            <div className='flex w-[1200px] gap-10'>
                <div className='w-[60%] h-[500px] bg-slate-200 rounded-lg flex flex-col px-5 py-10'>
                    <h1 className='text-center text-xl text-slate-600'>Contact with us through this form</h1>
                    <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                        <div>
                            <div className='flex items-center'>
                                <Label className='w-[30%]'>Full Name: </Label>
                                <Input
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    type='text'
                                    placeholder='Enter your name'
                                />
                            </div>
                            {fullNameError && <InlineError error={fullNameError} />}
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <Label className='w-[30%]'>Email: </Label>
                                <Input
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    placeholder='Enter your email'
                                />
                            </div>
                            {emailError && <InlineError error={emailError} />}
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <Label className='w-[30%]'>Phone: </Label>
                                <div className='flex w-full'>
                                    <div className='w-[35%]'>
                                        <Select value={country} onValueChange={(e) => setCountry(e)}>
                                            <SelectTrigger className='rounded-tr-none rounded-br-none'>
                                                <SelectValue placeholder="Select your country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Country</SelectLabel>
                                                    {result &&
                                                        result.map((e, index) => (
                                                            <SelectItem key={index} value={e.country_name}>
                                                                {e.country_name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='bg-white h-[38.5px] flex justify-center items-center mt-[1px] w-[15%]'>
                                        {outputResult}
                                    </div>
                                    <div className='w-[50%]'>
                                        <Input
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className='rounded-tl-none rounded-bl-none'
                                            type="number"
                                            placeholder='Enter your phone'
                                        />
                                    </div>
                                </div>
                            </div>
                            {phoneError && <InlineError error={phoneError} />}
                        </div>
                        <div className='flex flex-col gap-5'>
                            <Label>Message: </Label>
                            <Textarea
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="How can help you"
                            />
                            {messageError && <InlineError error={messageError} />}
                        </div>
                        <Button type="submit" disabled={buttonLoading}>
                            {buttonLoading ? 'Loading..' : 'SUBMIT'}
                        </Button>
                    </form>
                </div>
                <div className='w-[40%] h-[500px] rounded-lg overflow-hidden'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1706.7613312020935!2d105.77621101750509!3d21.03897088879833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c98b0023d9%3A0xcb63ee13ef718b22!2zS8OtIHTDumMgeMOhIFRyxrDhu51uZyBDYW8gxJHhurNuZyBNw7ph!5e1!3m2!1sen!2s!4v1731253445889!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
