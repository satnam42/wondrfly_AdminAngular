
import { Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";
import { ActiveUser } from "app/shared/services/auth/auth.guard";


export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signin",
        component: SigninComponent, canActivate: [ActiveUser],
        data: { title: "SIGNIN" }
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "NOT FOUND" }
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "ERROR" }
      }
    ]
  }
];
