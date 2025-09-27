import { supabase } from "./supabaseClient";

export class AuthService {
  async createAccountService({ email, password, name, phone, specialty }) {
    console.log("data for signup:", email, password, name, phone, specialty);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) return { user: null, error };
      const { data: insertData, error: insertError } = await supabase
        .from("providers")
        .insert([
          { id: data.user.id, name, email: data.user.email, phone, specialty, password }
        ]);

      console.log("Insert result:", insertData, insertError);

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  async loginService({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { user: null, error };
      return { user: data.user, error: null };
    } catch (error) {
      // console.error("Supabase service :: login :: error", error);
      return { user: null, error };
    }
  }

  async getCurrentUserService() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) return { user: null, error };
      return { user: data.user, error: null };
    } catch (error) {
      // console.error("Supabase service :: getCurrentUser :: error", error);
      return { user: null, error };
    }
  }

  async logoutService() {
    try {
      await supabase.auth.signOut();
      return true;
    } catch (error) {
      console.error("Supabase service :: logout :: error", error);
    }
  }

  // async signInWithGoogle() {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: String(import.meta.env.VITE_REDIRECT_URL),
  //       },
  //     });
  //     if (error) throw error;

  //     return data;
  //   } catch (error) {
  //     // console.error("Supabase service :: signInWithGoogle :: error", error);
  //     throw error;
  //   }
  // }
}

const authService = new AuthService();

export default authService;