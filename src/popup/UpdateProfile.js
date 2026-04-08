import { Box, Button, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useUpdateProfile } from "../hooks/UseUpdateProfile";
import Fetch from "../services/Fetch";
import { buildUpdateProfileFormData } from "../helper/UpdateProfileFormData";

function UpdateProfile({ onClickCancel, setSnackBar }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { profile, setProfile } = useContext(AuthContext);
    const { fullName, setFullName, email, setEmail, phone, setPhone, image, setImage, whatsappPhone, setWhatsappPhone } = useUpdateProfile();

    const handlePhone = (value, country, e, formattedValue) => {
        setPhone(value);
    };

    const handleWhatsapp = (value, country, e, formattedValue) => {
        setWhatsappPhone(value);
    };

    const resetValue = () => {
        setFullName(profile.full_name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setWhatsappPhone(profile.whatsapp_phone);
        setImage('');
    }

    useEffect(() => {
        if (profile)
            resetValue();
    }, [profile]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id='profile' /></Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <TextField disabled variant="outlined" label='Full Name' className="w-2/5 max-sm:w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField disabled aria-readonly variant="outlined" label='Email' className="w-2/5 max-sm:w-full max-sm:!mt-3" value={email} />
                </Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12 max-sm:w-full">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="phone" /></Typography>
                        <PhoneInput disabled value={phone} onChange={handlePhone} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                    <Box dir="ltr" className="w-2/5 h-14 my-5 max-sm:h-12 max-sm:w-full max-sm:!mt-10">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="whatsapp_phone" /></Typography>
                        <PhoneInput disabled value={whatsappPhone} onChange={handleWhatsapp} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default UpdateProfile;