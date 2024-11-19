import { basePost } from '@/utils/request'

export const getTableData = data => basePost('/getTableData', data);
