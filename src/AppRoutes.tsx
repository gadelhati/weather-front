import { Route, HashRouter, Routes, Navigate } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { LoginProfile } from "./container/form/login.profile";
import { SideContainer } from "./container/sidebar/sidebar";
import { FlexCointainer, SideItem } from "./container/template/flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/auth.provider";
import { initialFoodCategory } from "./component/food.category/food.category.initial";
import { initialPreparation } from "./component/preparation/preparation.initial";

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
                                <Route path="/user" element={<GenericForm key='user_entity' object={initialUser} url={'user_entity'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/food" element={<GenericForm key='food' object={initialFood} url={'food'} />}></Route>
                                <Route path="/preparation" element={<GenericForm key='preparation' object={initialPreparation} url={'preparation'} />}></Route>
                                <Route path="/food_category" element={<GenericForm key='food_category' object={initialFoodCategory} url={'food_category'} />}></Route>
                            </Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}