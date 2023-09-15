import { Route, HashRouter, Routes } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { Login } from "./container/form/login";
import { Profile } from "./container/form/profile";
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
import { Home } from "./container/form/home";
import ReactPDF, { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from "./component/pdf/MyDocument";

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
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/userEntity" element={<GenericForm key='userEntity' object={initialUser} url={'userEntity'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/food" element={<GenericForm key='food' object={initialFood} />}></Route>
                                <Route path="/preparation" element={<GenericForm key='preparation' object={initialPreparation} />}></Route>
                                <Route path="/foodCategory" element={<GenericForm key='foodCategory' object={initialFoodCategory} />}></Route>

                                <Route path="/weather" element={<GenericForm key='weather' object={initialWeather} url={'weather'} />}></Route>
                                <Route path="/weather/historic" element={<GenericForm key='weatherHistoric' object={initialWeatherHistoric} url={'weather/historic'} />}></Route>
                                <Route path="/weatherOffShore/historic" element={<GenericForm key='weatherOffShoreHistoric' object={initialWeatherOffShore} url={'weather/OffShore/historic'} />}></Route>
                                <Route path="/weatherOnShore/historic" element={<GenericForm key='weatherOnShoreHistoric' object={initialWeatherOnShore} url={'weather/OnShore/historic'} />}></Route>

                                <Route path="/commission" element={<GenericForm key='commission' object={initialCommission} url={'commission'} />}></Route>
                                <Route path="/country" element={<GenericForm key='country' object={initialCountry} url={'country'} />}></Route>
                                <Route path="/equipment" element={<GenericForm key='equipment' object={initialEquipment} url={'equipment'} />}></Route>
                                <Route path="/harbor" element={<GenericForm key='harbor' object={initialHarbor} url={'harbor'} />}></Route>
                                <Route path="/institution" element={<GenericForm key='institution' object={initialInstitution} url={'institution'} />}></Route>
                                <Route path="/manufacturer" element={<GenericForm key='manufacturer' object={initialManufacturer} url={'manufacturer'} />}></Route>
                                <Route path="/observer" element={<GenericForm key='observer' object={initialObserver} url={'observer'} />}></Route>
                                <Route path="/om" element={<GenericForm key='om' object={initialOM} url={'om'} />}></Route>
                                <Route path="/platform" element={<GenericForm key='platform' object={initialPlatform} url={'platform'} />}></Route>
                                <Route path="/platformCategory" element={<GenericForm key='platformCategory' object={initialPlatformCategory} url={'platformCategory'} />}></Route>
                                <Route path="/researcher" element={<GenericForm key='researcher' object={initialResearcher} url={'researcher'} />}></Route>
                                {/* <Route path="/station" element={<GenericForm key='station' object={initialStation} url={'station'} />}></Route> */}
                                <Route path="/stationOffShore" element={<GenericForm key='stationOffShore' object={initialStationOffShore} url={'stationOffShore'} />}></Route>
                                <Route path="/stationOnShore" element={<GenericForm key='stationOnShore' object={initialStationOnShore} url={'stationOnShore'} />}></Route>
                                <Route path="/stationCategory" element={<GenericForm key='stationCategory' object={initialStationCategory} url={'stationCategory'} />}></Route>
                                <Route path="/station/historic" element={<GenericForm key='stationHistoric' object={initialStationHistoric} url={'station/historic'} />}></Route>
                                <Route path="/stationOffShore/historic" element={<GenericForm key='stationHistoricOffShore' object={initialStationHistoricOffShore} url={'stationOffShore/historic'} />}></Route>
                                <Route path="/stationOnShore/historic" element={<GenericForm key='stationHistoricOnShore' object={initialStationHistoricOnShore} url={'stationOnShore/historic'} />}></Route>
                                <Route path="/surveying" element={<GenericForm key='surveying' object={initialCountry} url={'surveying'} />}></Route>
                                <Route path="/pdf" element={
                                    // <PDFViewer>
                                    //     <MyDocument />
                                    // </PDFViewer>
                                    <div>
                                        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Loading document...' : 'Download now!'
                                            }
                                        </PDFDownloadLink>
                                    </div>
                            }></Route>
                            </Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}