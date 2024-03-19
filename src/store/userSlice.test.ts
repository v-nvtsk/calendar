import { store } from ".";
import { UserData } from "../api/firebase";
import firebase from "../api/firebase/firebase";
import { getData } from "./userSlice";

jest.mock("../api/firebase/firebase.ts");

describe("getUserData", () => {
  const userData: UserData = {
    localId: "7U0tcjEQXKNyyEnlt0sAADV8pk92",
    email: "test@test.test",
  };

  beforeEach(async () => {
    jest.spyOn(firebase, "getUserData").mockResolvedValue(userData);
  });

  afterEach(async () => {
    jest.spyOn(firebase, "read").mockResolvedValue({});
  });

  it("should read todo items", async () => {
    await store.dispatch(getData());
    expect(store.getState().user.user).toEqual(userData);
  });

  it("should set errorState if read fails", async () => {
    jest.spyOn(firebase, "getUserData").mockResolvedValue(null);
    await store.dispatch(getData());
    expect(store.getState().user.errorState).toEqual("Could not get user data");
  });
});
