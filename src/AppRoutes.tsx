import { Route, HashRouter, Routes } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { LoginProfile } from "./container/form/login.profile";
import { SideContainer } from "./container/sidebar/sidebar";
import { FlexCointainer } from "./container/template/flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/auth.provider";
import { initialFoodCategory } from "./component/food.category/food.category.initial";
import { initialPreparation } from "./component/preparation/preparation.initial";
import { initialCountry } from "./component/country/country.initial";
import { initialCommission } from "./component/commission/commission.initial";
import { initialEquipment } from "./component/equipment/equipment.initial";
import { initialHarbor } from "./component/harbor/harbor.initial";
import { initialInstitution } from "./component/institution/institution.initial";
import { initialManufacturer } from "./component/manufacturer/manufacturer.initial";
import { initialObserver } from "./component/observer/observer.initial";
import { initialOM } from "./component/om/om.initial";
import { initialPlatform } from "./component/platform/platform.initial";
import { initialPlatformCategory } from "./component/platform.category/platformCategory.initial";
import { initialResearcher } from "./component/researcher/researcher.initial";
// import { initialStation } from "./component/station/station.initial";
import { initialStationCategory } from "./component/station.category/station.category.initial";
import { initialStationOffShore } from "./component/station.off.shore/station.off.shore.initial";
import { initialStationOnShore } from "./component/station.on.shore/station.on.shore.initial";
import { initialStationHistoric } from "./component/station.historic/station.historic.initial";
import { initialWeather } from "./component/weather/weather.initial";
import { initialWeatherHistoric } from "./component/weather.historic/weather.historic.initial";
import { initialWeatherOffShore } from "./component/weather.off.shore/weather.off.shore.initial";
import { initialWeatherOnShore } from "./component/weather.on.shore/weather.on.shore.initial";
import { initialStationHistoricOffShore } from "./component/station.historic.off.shore/station.historic.off.shore.initial";
import { initialStationHistoricOnShore } from "./component/station.historic.on.shore/station.historic.on.shore.initial";

const ROLES = {
    'USER': "ROLE_USER",
    'ADMIN': "ROLE_ADMIN",
    'MODERATOR': "ROLE_MODERATOR"
}

export default function AppRoutes() {

    return (
        <HashRouter>
            <AuthProvider>
                <FlexCointainer element='all'>
                    {isValidToken() && <SideContainer />}
                    <FlexCointainer element='main'>
                        <Routes>
                            <Route path="*" element={<LoginProfile />}></Route>
                            <Route path="/" element={<LoginProfile />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/user_entity" element={<GenericForm key='user_entity' object={initialUser} url={'user_entity'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/food" element={<GenericForm key='food' object={initialFood} />}></Route>
                                <Route path="/preparation" element={<GenericForm key='preparation' object={initialPreparation} />}></Route>
                                <Route path="/food_category" element={<GenericForm key='food_category' object={initialFoodCategory} />}></Route>
                            </Route>
                            <Route path="/weather" element={<GenericForm key='weather' object={initialWeather} url={'weather'} />}></Route>
                            
                            <Route path="/weather_historic" element={<GenericForm key='weatherHistoric' object={initialWeatherHistoric} url={'weather/historic'} />}></Route>
                            <Route path="/weather_historic_off_shore" element={<GenericForm key='weatherHistoricOffShore' object={initialWeatherOffShore} url={'weather/historicOffShore'} />}></Route>
                            <Route path="/weather_historic_on_shore" element={<GenericForm key='weatherHistoricOnShore' object={initialWeatherOnShore} url={'weather/historicOnShore'} />}></Route>


                            <Route path="/commission" element={<GenericForm key='commission' object={initialCommission} url={'commission'} />}></Route>
                            <Route path="/country" element={<GenericForm key='country' object={initialCountry} url={'country'} />}></Route>
                            <Route path="/equipment" element={<GenericForm key='equipment' object={initialEquipment} url={'equipment'} />}></Route>
                            <Route path="/harbor" element={<GenericForm key='harbor' object={initialHarbor} url={'harbor'} />}></Route>
                            <Route path="/institution" element={<GenericForm key='institution' object={initialInstitution} url={'institution'} />}></Route>
                            <Route path="/manufacturer" element={<GenericForm key='manufacturer' object={initialManufacturer} url={'manufacturer'} />}></Route>
                            <Route path="/observer" element={<GenericForm key='observer' object={initialObserver} url={'observer'} />}></Route>
                            <Route path="/om" element={<GenericForm key='om' object={initialOM} url={'om'} />}></Route>
                            <Route path="/platform" element={<GenericForm key='platform' object={initialPlatform} url={'platform'} />}></Route>
                            <Route path="/platform_category" element={<GenericForm key='platform_category' object={initialPlatformCategory} url={'platformCategory'} />}></Route>
                            <Route path="/researcher" element={<GenericForm key='researcher' object={initialResearcher} url={'researcher'} />}></Route>
                            {/* <Route path="/station" element={<GenericForm key='station' object={initialStation} url={'station'} />}></Route> */}
                            <Route path="/station_category" element={<GenericForm key='station_category' object={initialStationCategory} url={'stationCategory'} />}></Route>
                            <Route path="/station_historic" element={<GenericForm key='station_historic' object={initialStationHistoric} url={'station/historic'} />}></Route>
                            <Route path="/station_historic_off_shore" element={<GenericForm key='station_historic_off_shore' object={initialStationHistoricOffShore} url={'stationOffShore/historic'} />}></Route>
                            <Route path="/station_historic_on_shore" element={<GenericForm key='station_historic_on_shore' object={initialStationHistoricOnShore} url={'stationOnShore/historic'} />}></Route>
                            <Route path="/station_off_shore" element={<GenericForm key='station_off_shore' object={initialStationOffShore} url={'stationOffShore'} />}></Route>
                            <Route path="/station_on_shore" element={<GenericForm key='station_on_shore' object={initialStationOnShore} url={'stationOnShore'} />}></Route>
                            <Route path="/surveying" element={<GenericForm key='surveying' object={initialCountry} url={'surveying'} />}></Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}