import { supabase } from "./supabaseClient";

export class AuthService {
  async createAccountService({ email, password, name, phone, specialty }) {
    console.log("Signup service called with:", { email, password: '***', name, phone, specialty });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      
      console.log('Supabase signup response:', { data, error });
      
      if (error) {
        console.error('Supabase signup error:', error);
        return { user: null, error };
      }
      
      // Insert provider data into providers table
      const providerData = { id: data.user.id, name, email: data.user.email, phone, specialty, password };
      
      const { data: insertData, error: insertError } = await supabase
        .from("providers")
        .insert([providerData])
        .select()
        .single();

      console.log("Provider insert result:", { insertData, insertError });
      
      if (insertError) {
        console.error('Provider insert error:', insertError);
        // Note: User is created in auth but provider data failed
        // You might want to handle this case differently
        return { user: data.user, provider: null, error: insertError };
      }

      return { user: data.user, provider: insertData, error: null };
    } catch (error) {
      console.error("Signup service error:", error);
      return { user: null, error };
    }
  }

  async loginService({ email, password }) {
    console.log('LoginService called with:', { email, password: '***' });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Supabase auth response:', { data, error });
      
      if (error) {
        console.error('Supabase login error:', error);
        return { user: null, error };
      }
      
      // Check if user exists in providers table
      console.log('Checking if user exists in providers table:', data.user.id);
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      console.log('Provider check result:', { providerData, providerError });
      
      if (providerError || !providerData) {
        console.log('User not found in providers table, signing out');
        // Sign out the user immediately if not found in providers table
        await supabase.auth.signOut();
        return { 
          user: null, 
          error: { message: 'Access denied: User not authorized as a provider' } 
        };
      }
      
      console.log('Login successful and provider verified:', data.user);
      return { user: data.user, provider: providerData, error: null };
    } catch (error) {
      console.error("Supabase service :: login :: error", error);
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