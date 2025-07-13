'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Mail, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { QuestionnaireResult } from '@/types/matrix';

interface EmailCaptureProps {
  result: QuestionnaireResult;
  onEmailSubmit: (email: string, preferences: EmailPreferences, userInfo: UserInfo) => void;
  onSkip: () => void;
}

interface EmailPreferences {
  riskUpdates: boolean;
  learningResources: boolean;
  industryInsights: boolean;
}

interface UserInfo {
  role: string;
  industry: string;
  company: string;
  experienceLevel: string;
  primaryGoals: string[];
}

export function EmailCapture({ result, onEmailSubmit, onSkip }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<EmailPreferences>({
    riskUpdates: true,
    learningResources: true,
    industryInsights: false
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    role: '',
    industry: '',
    company: '',
    experienceLevel: '',
    primaryGoals: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !userInfo.role || !userInfo.industry) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onEmailSubmit(email, preferences, userInfo);
    setIsSubmitting(false);
  };

  const updateUserInfo = (field: keyof UserInfo, value: string) => {
    if (field === 'primaryGoals') {
      // This shouldn't be called for primaryGoals since we handle it separately
      return;
    }
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = (goal: string) => {
    if (!userInfo.primaryGoals.includes(goal)) {
      setUserInfo(prev => ({
        ...prev,
        primaryGoals: [...prev.primaryGoals, goal]
      }));
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setUserInfo(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.filter(goal => goal !== goalToRemove)
    }));
  };

  const getRiskIcon = () => {
    switch (result.riskProfile.level) {
      case 'Low': return <Shield className="w-5 h-5 text-green-600" />;
      case 'Medium': return <TrendingUp className="w-5 h-5 text-yellow-600" />;
      case 'High': return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getRiskColor = () => {
    switch (result.riskProfile.level) {
      case 'Low': return 'border-green-200 bg-green-50';
      case 'Medium': return 'border-yellow-200 bg-yellow-50';
      case 'High': return 'border-red-200 bg-red-50';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl">Get Your Personalized AI Risk Report</CardTitle>
        <CardDescription>
          Receive detailed insights about your AI risk profile and personalized resources to enhance your expertise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Preview */}
        <div className={`p-4 rounded-lg border-2 ${getRiskColor()}`}>
          <div className="flex items-center space-x-3 mb-3">
            {getRiskIcon()}
            <h3 className="font-semibold text-gray-900">
              Your AI Risk Level: {result.riskProfile.level}
            </h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            {result.riskProfile.description}
          </p>
          <div className="text-xs text-gray-600">
            <strong>Key Areas to Address:</strong> {result.riskProfile.keyRisks.slice(0, 2).join(', ')}
            {result.riskProfile.keyRisks.length > 2 && '...'}
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="mt-1"
            />
          </div>

          {/* User Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="role">Role/Job Title *</Label>
              <Select value={userInfo.role} onValueChange={(value) => updateUserInfo('role', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="marketing">Marketing Professional</SelectItem>
                  <SelectItem value="sales">Sales Professional</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="executive">Executive/C-Level</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={userInfo.industry} onValueChange={(value) => updateUserInfo('industry', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="media">Media & Entertainment</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={userInfo.company}
                onChange={(e) => updateUserInfo('company', e.target.value)}
                placeholder="Your company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={userInfo.experienceLevel} onValueChange={(value) => updateUserInfo('experienceLevel', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                  <SelectItem value="executive">Executive Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="goal">Primary Goals with AI (select multiple)</Label>
            <Select onValueChange={addGoal}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="What are your main goals with AI?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productivity">Increase productivity</SelectItem>
                <SelectItem value="learning">Learn new skills</SelectItem>
                <SelectItem value="automation">Automate repetitive tasks</SelectItem>
                <SelectItem value="innovation">Drive innovation</SelectItem>
                <SelectItem value="competitive">Stay competitive</SelectItem>
                <SelectItem value="career">Advance my career</SelectItem>
                <SelectItem value="business">Grow my business</SelectItem>
                <SelectItem value="understanding">Better understand AI</SelectItem>
              </SelectContent>
            </Select>

            {/* Selected Goals Display */}
            {userInfo.primaryGoals.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {userInfo.primaryGoals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="flex items-center gap-1">
                    {goal === 'productivity' && 'Increase productivity'}
                    {goal === 'learning' && 'Learn new skills'}
                    {goal === 'automation' && 'Automate repetitive tasks'}
                    {goal === 'innovation' && 'Drive innovation'}
                    {goal === 'competitive' && 'Stay competitive'}
                    {goal === 'career' && 'Advance my career'}
                    {goal === 'business' && 'Grow my business'}
                    {goal === 'understanding' && 'Better understand AI'}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeGoal(goal)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {/* Email Preferences */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What would you like to receive?</Label>

            <div className="flex items-center space-x-4">
              <Checkbox
                id="risk-updates"
                checked={preferences.riskUpdates}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, riskUpdates: checked as boolean }))
                }
              />
              <Label htmlFor="risk-updates" className="text-sm">
                <span><strong>Detailed Risk Assessment</strong> - Complete analysis of your AI vulnerabilities and mitigation strategies</span>
              </Label>
            </div>

            <div className="flex items-center space-x-4">
              <Checkbox
                id="learning-resources"
                checked={preferences.learningResources}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, learningResources: checked as boolean }))
                }
              />
              <Label htmlFor="learning-resources" className="text-sm">
                <span><strong>Personalized Learning Resources</strong> - Curated content to improve your AI skills in your domain</span>
              </Label>
            </div>

            <div className="flex items-center space-x-4">
              <Checkbox
                id="industry-insights"
                checked={preferences.industryInsights}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, industryInsights: checked as boolean }))
                }
              />
              <Label htmlFor="industry-insights" className="text-sm">
                <span><strong>Industry AI Insights</strong> - Weekly updates on AI trends and best practices (optional)</span>
              </Label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={!email || !userInfo.role || !userInfo.industry || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Get My Risk Report'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
            >
              Skip for Now
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe anytime. No spam, just valuable AI insights.
        </div>
      </CardContent>
    </Card>
  );
}