// otpService.ts
import { auth } from '../config/firebase.ts';

// Sends OTP to a phone number
export const sendFirebaseOtp = async (phoneNumber: string) => {
    try {
        const fullMobile = phoneNumber;
        // Ensure phone number is in the correct format with country code
        const confirmation = await auth().signInWithPhoneNumber(fullMobile);
        console.log('OTP sent:', confirmation);
        return confirmation; // You can use confirmation.confirm(code) to verify OTP
    } catch (error) {
        console.error('Failed to send OTP:', error);
        throw error;
    }
};