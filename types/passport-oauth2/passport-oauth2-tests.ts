import OAuth2Strategy = require("passport-oauth2");
import { Request } from "express";
import { Strategy as PassportStrategy } from "passport";
import {
    AuthorizationError,
    InternalOAuthError,
    Metadata,
    StateStore,
    StateStoreStoreCallback,
    StateStoreVerifyCallback,
    Strategy,
    StrategyOptions,
    StrategyOptionsWithRequest,
    TokenError,
    VerifyCallback,
} from "passport-oauth2";

const strategyOptions1: StrategyOptions = {
    authorizationURL: "http://www.example.com/auth",
    callbackURL: "http://www.example.com/callback",
    clientID: "dummy",
    clientSecret: "secret",
    tokenURL: "http://www.example.com/token",
};

function verifyFunction1(_accessToken: string, _refreshToken: string, _profile: any, verifyCallback: VerifyCallback) {
    verifyCallback(new Error("unimplemented"));
}

function verifyFunction2(
    _accessToken: string,
    _refreshToken: string,
    _results: any,
    _profile: any,
    verifyCallback: VerifyCallback,
) {
    verifyCallback(new Error("unimplemented"));
}

const strategy1: OAuth2Strategy = new OAuth2Strategy(strategyOptions1, verifyFunction1);

const strategy2: Strategy = new OAuth2Strategy(strategyOptions1, verifyFunction2);

function verifyFunction3(
    _req: Request,
    _accessToken: string,
    _refreshToken: string,
    _profile: any,
    verifyCallback: VerifyCallback,
) {
    verifyCallback(undefined, { userid: "1" });
}

function verifyFunction4(
    _req: Request,
    _accessToken: string,
    _refreshToken: string,
    _results: any,
    _profile: any,
    verifyCallback: VerifyCallback,
) {
    verifyCallback(undefined, { userid: "1" });
}

const strategyOptions2: StrategyOptionsWithRequest = {
    authorizationURL: "http://www.example.com/auth",
    clientID: "dummy",
    clientSecret: "secret",
    tokenURL: "http://www.example.com/token",
    passReqToCallback: true,
};

const strategy3: PassportStrategy = new OAuth2Strategy(strategyOptions2, verifyFunction3);

const strategy4: Strategy = new Strategy(strategyOptions2, verifyFunction4);

const err1 = new AuthorizationError("Description", "invalid_request", undefined);

const err2 = new TokenError(undefined, "invalid_request", undefined);

const err3 = new InternalOAuthError("Hello", {});

class MyStrategy extends OAuth2Strategy {
    useProtectedProperty() {
        this._oauth2.get("http://www.example.com/profile", "token", err => err.statusCode);
        this._oauth2.get("http://www.example.com/profile", "token", (err, result) => result);
        this._oauth2.get("http://www.example.com/profile", "token", (err, result, response) => response);
    }
}

const metadata: Metadata = {
    authorizationURL: "http://www.example.com/auth",
    clientID: "dummy",
    tokenURL: "http://www.example.com/token",
};

class MyStore implements StateStore {
    store(req: Request, meta: StateStoreStoreCallback | Metadata, callback?: StateStoreStoreCallback): void {}
    verify(
        req: Request,
        state: string,
        meta: StateStoreVerifyCallback | Metadata,
        callback?: StateStoreVerifyCallback,
    ): void {}
}

const myStore = new MyStore();

const strategyOptions3: StrategyOptions = {
    authorizationURL: "http://www.example.com/auth",
    clientID: "dummy",
    clientSecret: "secret",
    tokenURL: "http://www.example.com/token",
    callbackURL: "http://www.example.com/callback",
    customHeaders: {
        "content-type": "text/html",
    },
    scope: ["scope1", "scope2"],
    scopeSeparator: " ",
    sessionKey: "oauth",
    state: { id: 1 },
    store: myStore,
    skipUserProfile: true,
    pkce: false,
};

const strategy5: Strategy = new Strategy(strategyOptions3, verifyFunction2);

interface ProviderSpecificProfile {
    someProviderProfileField: string;
}
interface ProviderSpecificResults {
    someProviderResultField: string;
}
const providerSpecificVerifyFunction: OAuth2Strategy.VerifyFunction<
    ProviderSpecificProfile,
    ProviderSpecificResults
> = (accessToken, refreshToken, results, profile, verified) => {
    results.someProviderResultField;
    profile.someProviderProfileField;
    verified(null, false);
};
const providerSpecificVerifyFunctionWithRequest: OAuth2Strategy.VerifyFunctionWithRequest<
    ProviderSpecificProfile,
    ProviderSpecificResults
> = (req, accessToken, refreshToken, results, profile, verified) => {
    let err: unknown;
    results.someProviderResultField;
    profile.someProviderProfileField;
    verified(err);
};

class ExtendedStrategy extends OAuth2Strategy {
    constructor(options: StrategyOptions, verify: OAuth2Strategy.VerifyFunction) {
        super(options, verify);
    }

    userProfile(accessToken: string, done: (errx?: unknown, profile?: any) => void): void {
    }
}
