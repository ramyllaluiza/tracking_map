'use client';

import { PropsWithChildren, useActionState } from "react";
import { createRouteAction } from "./create-route.action";

export function NewRouteForm(props: PropsWithChildren) {
        const [state, formAction ] = useActionState<
        {
            error?: string;
            sucess?: boolean;
        } | null, 
        FormData
        >(createRouteAction, null);
    return (
    <form action={formAction}> 
    {state?.error && (
        <div className="p-4 border rounded text-contrast bg-error">
        {state.error}
        </div>
    )} 
    {state?.sucess && (
        <div className="p-4 border rounded text-contrast bg-sucess">
        Rota criada com sucesso
        </div>
    )} 
    {props.children}
    </form>);
}