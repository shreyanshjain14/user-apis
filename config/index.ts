import app from "./app";
import auth from "./auth";
import db from "./database";
import queue from "./queue";
import services from "./services";
import settings from "./settings";
import storage from "./storage";
export default [app, db, settings, services, auth, storage, queue];
