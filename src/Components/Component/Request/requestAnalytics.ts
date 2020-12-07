import {instance} from "./request";
import {AnalyticsChartItem, OverviewPageItem} from "../../../State/analytics-reducer";

type RequestAnalyticsType = {
    average: number,
    chart: Array<AnalyticsChartItem>
}

type RequestOverview = {
    gain: OverviewPageItem
    orders: OverviewPageItem
}

export const requestAnalyticsAPI = {
    getAnalytics (token: string | null) {
        return instance.get<RequestAnalyticsType>('analytics/analytics', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    getOverview (token: string | null) {
        return instance.get<RequestOverview>('analytics/overview', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}
