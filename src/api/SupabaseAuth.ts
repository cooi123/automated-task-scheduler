import { SupabaseClient } from "@supabase/auth-helpers-react";



export async function handleLogin(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            scopes:
                "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
        },
    });

    if (error) {
        alert("Error logging in to google provider");
        console.log(error);
    }
}


export async function handleSignOut(supabase: SupabaseClient) {
    await supabase.auth.signOut().then(() => {
        alert("Signed out");
    })
}
