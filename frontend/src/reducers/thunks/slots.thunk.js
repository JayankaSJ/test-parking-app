import { getSlotsRequest } from '../../api/slots.api';
import { configureWith } from '../../hooks/useApi';
import { createAppAsyncThunk } from '../../store';

export const fetchSlots = createAppAsyncThunk(
    'fetchSlots',
    async (_, { getState }) => {
        let state = getState();
        
        let request = getSlotsRequest();
        request.accessToken = state?.auth?.accessToken

        const response = await configureWith(request);

        return response || [];
    })


