"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Palette, Save } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@cietschool.edu",
    bio: "Experienced educator passionate about technology and learning.",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    courseUpdates: true,
    studentMessages: true,
  })

  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "EST",
    dateFormat: "MM/DD/YYYY",
    theme: "system",
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/diverse-user-avatars.png" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <Separator />

              {/* Profile Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profile.name} onChange={(e) => handleProfileChange("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  rows={3}
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly summary reports</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about course changes</p>
                  </div>
                  <Switch
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("courseUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Messages</Label>
                    <p className="text-sm text-muted-foreground">Notifications for student messages</p>
                  </div>
                  <Switch
                    checked={notifications.studentMessages}
                    onCheckedChange={(checked) => handleNotificationChange("studentMessages", checked)}
                  />
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                System Preferences
              </CardTitle>
              <CardDescription>Customize your system preferences and display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange("language", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={preferences.timezone}
                    onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Input
                    id="dateFormat"
                    value={preferences.dateFormat}
                    onChange={(e) => handlePreferenceChange("dateFormat", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Input
                    id="theme"
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange("theme", e.target.value)}
                  />
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge variant="secondary">Not Enabled</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Active Sessions</h4>
                    <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Data Export</h4>
                    <p className="text-sm text-muted-foreground">Download your account data</p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
