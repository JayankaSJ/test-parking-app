import { message } from 'antd';
import { signOut } from '../../reducers/auth.reducer';
import { createAppAsyncThunk } from '../../store';

export const signOutWithDelay = createAppAsyncThunk(
    'sign_out_with_delay',
    async (_, { dispatch }) => {
        let key = 'sign_out_with_delay_message';
        message.warn({ content: "Session has been expired! you will signed out!", key, duration: 6 });

        setTimeout(() => {
            message.success({ content: "You have been successfully signed out!", key });
            dispatch(signOut());
        }, 4000);
        return {}
    })


