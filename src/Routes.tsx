import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from "./component/pdf/PDFDocument";
import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { SideContainer } from "./container/sidebar/sidebar";
import { FlexCointainer, SideItem } from "./container/template/flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/auth.provider";
import { initialFoodCategory } from "./component/foodCategory/food.category.initial";
import { initialPreparation } from "./component/preparation/preparation.initial";
import { Login } from "./container/form/login";
import { Home } from "./container/home";
import { Profile } from "./container/profile";
import { MilitariesList } from "./container/service/MilitariesList";
import { initialCompositeUnit } from "./component/composite_unit/composite.unit.initial";
import { initialCommission } from "./component/commission/commission.initial";
import { initialCountry } from "./component/country/country.initial";
import { initialEquipment } from "./component/equipment/equipment.initial";
import { initialHarbor } from "./component/harbor/harbor.initial";
import { initialInstitution } from "./component/institution/institution.initial";
import { initialManufacturer } from "./component/manufacturer/manufacturer.initial";
import { initialObserver } from "./component/observer/observer.initial";
import { initialOM } from "./component/om/om.initial";
import { initialPlatform } from "./component/platform/platform.initial";
import { initialPlatformCategory } from "./component/platform.category/platformCategory.initial";
import { initialResearcher } from "./component/researcher/researcher.initial";
import { initialStation } from "./component/station/station.initial";
import { initialStationCategory } from "./component/station.category/station.category.initial";
import { initialStationHistoric } from "./component/station.historic/station.historic.initial";
import { initialStationHistoricOffShore } from "./component/station.historic.off.shore/station.historic.off.shore.initial";
import { initialStationHistoricOnShore } from "./component/station.historic.on.shore/station.historic.on.shore.initial";
import { initialStationOffShore } from "./component/station.off.shore/station.off.shore.initial";
import { initialStationOnShore } from "./component/station.on.shore/station.on.shore.initial";
import { initialSurveying } from "./component/surveying/surveying.initial";
import { initialWeather } from "./component/weather/weather.initial";
import { initialWeatherHistoricOffShore } from "./component/weather.historic.off.shore/weather.historic.off.shore.initial";
import { initialWeatherHistoricOnShore } from "./component/weather.historic.on.shore/weather.historic.on.shore.initial";
import { initialWeatherOffShore } from "./component/weather.off.shore/weather.off.shore.initial";
import { initialWeatherOnShore } from "./component/weather.on.shore/weather.on.shore.initial";
import { initialAddress } from "./component/address/address.initial";
import { initialBlind } from "./component/blind/blind.initial";
import { initialCompany } from "./component/company/company.initial";
import { initialComponent } from "./component/component/component.initial";
import { initialFederativeUnit } from "./component/federative.unit/federative.unit.initial";
import { initialHarmonicConstant } from "./component/harmonic.constant/harmonic.constant.initial";
import { initialInstalation } from "./component/instalation/instalation.initial";
import { initialMaintainer } from "./component/maintainer/maintainer.initial";
import { initialPerson } from "./component/person/person.initial";
import { initialQuality } from "./component/quality/quality.initial";
import { initialRadar } from "./component/radar/radar.initial";
import { initialStructure } from "./component/structure/structure.initial";
import { initialPrivilege } from "./component/privilege/privilege.initial";
import { WeatherForm } from "./container/form/weather.form";
import { initialCity } from "./component/city/city.initial";
import { initialState } from "./component/state/state.initial";
import { initialWeatherHistoric } from "./component/weather.historic/weather.historic.initial";

export const ROLES = {
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
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/userEntity" element={<GenericForm key='userEntity' object={initialUser} url={'userEntity'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/city" element={<GenericForm key='city' object={initialCity} url={'city'} />}></Route>
                                <Route path="/state" element={<GenericForm key='state' object={initialState} url={'state'} />}></Route>
                                <Route path="/address" element={<GenericForm key='address' object={initialAddress} url={'address'} />}></Route>
                                <Route path="/blind" element={<GenericForm key='blind' object={initialBlind} url={'blind'} />}></Route>
                                <Route path="/commission" element={<GenericForm key='commission' object={initialCommission} url={'commission'} />}></Route>
                                <Route path="/company" element={<GenericForm key='company' object={initialCompany} url={'company'} />}></Route>
                                <Route path="/component" element={<GenericForm key='component' object={initialComponent} url={'component'} />}></Route>
                                <Route path="/country" element={<GenericForm key='country' object={initialCountry} url={'country'} />}></Route>
                                <Route path="/equipment" element={<GenericForm key='equipment' object={initialEquipment} url={'equipment'} />}></Route>
                                <Route path="/federativeUnit" element={<GenericForm key='federativeUnit' object={initialFederativeUnit} url={'federativeUnit'} />}></Route>
                                <Route path="/harbor" element={<GenericForm key='harbor' object={initialHarbor} url={'harbor'} />}></Route>
                                <Route path="/harmonicConstant" element={<GenericForm key='harmonicConstant' object={initialHarmonicConstant} url={'harmonicConstant'} />}></Route>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/instalation" element={<GenericForm key='instalation' object={initialInstalation} url={'instalation'} />}></Route>
                                <Route path="/institution" element={<GenericForm key='institution' object={initialInstitution} url={'institution'} />}></Route>
                                <Route path="/maintaner" element={<GenericForm key='maintaner' object={initialMaintainer} url={'maintaner'} />}></Route>
                                <Route path="/manufacturer" element={<GenericForm key='manufacturer' object={initialManufacturer} url={'manufacturer'} />}></Route>
                                <Route path="/observer" element={<GenericForm key='observer' object={initialObserver} url={'observer'} />}></Route>
                                <Route path="/om" element={<GenericForm key='om' object={initialOM} url={'om'} />}></Route>
                                <Route path="/person" element={<GenericForm key='person' object={initialPerson} url={'person'} />}></Route>
                                <Route path="/platform" element={<GenericForm key='platform' object={initialPlatform} url={'platform'} />}></Route>
                                <Route path="/platformCategory" element={<GenericForm key='platformCategory' object={initialPlatformCategory} url={'platformCategory'} />}></Route>
                                <Route path="/privilege" element={<GenericForm key='privilege' object={initialPrivilege} url={'privilege'} />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/quality" element={<GenericForm key='quality' object={initialQuality} url={'quality'} />}></Route>
                                <Route path="/radar" element={<GenericForm key='radar' object={initialRadar} url={'radar'} />}></Route>
                                <Route path="/researcher" element={<GenericForm key='researcher' object={initialResearcher} url={'researcher'} />}></Route>
                                <Route path="/station" element={<GenericForm key='station' object={initialStation} url={'station'} />}></Route>
                                <Route path="/stationCategory" element={<GenericForm key='stationCategory' object={initialStationCategory} url={'stationCategory'} />}></Route>
                                <Route path="/station/historic" element={<GenericForm key='stationHistoric' object={initialStationHistoric} url={'station/historic'} />}></Route>
                                <Route path="/stationHistoricOffShore" element={<GenericForm key='stationHistoricOffShore' object={initialStationHistoricOffShore} url={'stationHistoricOffShore'} />}></Route>
                                <Route path="/stationHistoricOnShore" element={<GenericForm key='stationHistoricOnShore' object={initialStationHistoricOnShore} url={'stationHistoricOnShore'} />}></Route>
                                <Route path="/stationOffShore" element={<GenericForm key='stationOffShore' object={initialStationOffShore} url={'stationOffShore'} />}></Route>
                                <Route path="/stationOnShore" element={<GenericForm key='stationOnShore' object={initialStationOnShore} url={'stationOnShore'} />}></Route>
                                <Route path="/structure" element={<GenericForm key='structure' object={initialStructure} url={'structure'} />}></Route>
                                <Route path="/surveying" element={<GenericForm key='surveying' object={initialSurveying} url={'surveying'} />}></Route>
                                <Route path="/weather" element={<WeatherForm key='weather' object={initialWeather} url={'weather'} />}></Route>
                                <Route path="/weather/historic" element={<GenericForm key='weather/historic' object={initialWeatherHistoric} url={'weather/historic'} />}></Route>
                                <Route path="/weather/historic/offShore" element={<GenericForm key='weather/historic/offShore' object={initialWeatherHistoricOffShore} url={'weather/historic/offShore'} />}></Route>
                                <Route path="/weather/historic/onShore" element={<GenericForm key='weather/historic/onShore' object={initialWeatherHistoricOnShore} url={'weather/historic/onShore'} />}></Route>
                                <Route path="/weatherOffShore" element={<GenericForm key='weatherOffShore' object={initialWeatherOffShore} url={'weatherOffShore'} />}></Route>
                                <Route path="/weatherOnShore" element={<GenericForm key='weatherOnShore' object={initialWeatherOnShore} url={'weatherOnShore'} />}></Route>

                                <Route path="/military" element={<MilitariesList />}></Route>
                                <Route path="/food" element={<GenericForm key='food' object={initialFood} url={'food'} />}></Route>
                                <Route path="/preparation" element={<GenericForm key='preparation' object={initialPreparation} url={'preparation'} />}></Route>
                                <Route path="/food_category" element={<GenericForm key='food_category' object={initialFoodCategory} url={'food_category'} />}></Route>
                                <Route path="/composite_unit" element={<GenericForm key='composite_unit' object={initialCompositeUnit} url={'composite_unit'} />}></Route>
                            </Route>
                            <Route path="/pdf" element={
                                    // <PDFViewer>
                                    //     <MyDocument />
                                    // </PDFViewer>
                                    <div>
                                        <PDFDownloadLink document={<PDFDocument />} fileName="somename.pdf">
                                            {({ loading }) =>
                                                loading ? 'Loading document...' : 'Download now!'
                                            }
                                        </PDFDownloadLink>
                                    </div>
                            }></Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}