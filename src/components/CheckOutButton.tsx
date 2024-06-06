import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {UserFormData} from "@/forms/user-profile-form/UserProfileForm";
import { useUser } from "@/api/UserApi";

type Props = {
    onCheckOut: (userFormData: UserFormData) => void;
    disabled: boolean;
}
export default function CheckOutButton({onCheckOut, disabled}: Props) {
    const { 
        isAuthenticated, 
        isLoading: isAuthLoading, 
        loginWithRedirect, 
    } = useAuth0();

    const {pathname} = useLocation();

    const {getUser,isLoading:isGetUserLoading} = useUser();

    const onLogin = async ()=>{
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }
    if (!isAuthenticated) {
        return <Button onClick={onLogin}
                        className="bg-orange-500 flex-1">
                            Inicia sesión para Procesar
        </Button>
    }

    if(isAuthLoading || !getUser) {
        return <LoadingButton/>
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button disabled ={disabled}
                className="bg-orange-500 flex-1">
                Confirmar compra
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[700px] md:min-w[400px] bg-gray-50">
            <UserProfileForm 
                getUser={getUser}
                onSave={onCheckOut}
                isLoading={isGetUserLoading}
                title="Confirmar detalles de entrega"
                buttonText="Pagar"/>
        </DialogContent>
    </Dialog>
  )
}
