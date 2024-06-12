"use client";

import { useState } from "react";
import { useSupabase } from "@/context/SupabaseAuthProvider";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Organization } from "@/utils/employer/interfaces";

export default function CreateOrganization() {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization>({
    name: "",
    tagline: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganization((prevOrg) => ({ ...prevOrg, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = session?.user;

    if (!user) {
      console.error("User not authenticated");
      return;
    }
    console.log(organization.name);
    try {
      // Check if an organization with the same name already exists
      const organizationSupaInstance = supabase.from("organizations");

      const { data: existingOrganizations, error: fetchError } =
        await organizationSupaInstance
          .select("name")
          .eq("name", organization.name);

      if (fetchError) {
        console.error("Error checking organization name:", fetchError.message);
        setError("Error checking organization name. Please try again later.");
        return;
      }

      if (existingOrganizations && existingOrganizations.length > 0) {
        setError(
          "Organization name already exists. Please choose a different name."
        );
        return;
      }

      // Insert the new organization if the name is unique
      const { data, error } = await organizationSupaInstance.insert([
        {
          ...organization,
          createdBy: user.id,
        },
      ]);

      if (error) {
        console.error("Error creating organization:", error.message);
        setError("Error creating organization. Please try again later.");
      } else {
        console.log("Organization created successfully:", data);
        router.push("/employer");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Organization
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Organization Name"
            name="name"
            value={organization.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Tagline"
            name="tagline"
            value={organization.tagline}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={organization.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Organization
          </Button>
        </Box>
      </form>
    </Container>
  );
}
