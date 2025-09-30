import { IStudent } from '@/models/Student'
import { IOpportunity } from '@/models/Opportunity'

interface ResumeAnalysis {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: ResumeSuggestion[]
  keywordMatch: KeywordMatch[]
  atsScore: number
}

interface ResumeSuggestion {
  category: 'skills' | 'experience' | 'education' | 'format' | 'content'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  action: string
}

interface KeywordMatch {
  keyword: string
  found: boolean
  importance: 'high' | 'medium' | 'low'
  suggestions: string[]
}

interface ATSAnalysis {
  score: number
  issues: string[]
  recommendations: string[]
}

export class ResumeOptimizer {
  /**
   * Analyze and optimize resume for a specific opportunity
   */
  static async analyzeResume(
    student: IStudent,
    opportunity: IOpportunity,
    resumeContent?: string
  ): Promise<ResumeAnalysis> {
    const keywordMatch = this.analyzeKeywords(student, opportunity)
    const atsAnalysis = this.analyzeATS(student, resumeContent)
    const suggestions = this.generateSuggestions(student, opportunity, keywordMatch)
    
    const strengths = this.identifyStrengths(student, opportunity)
    const weaknesses = this.identifyWeaknesses(student, opportunity, keywordMatch)
    
    const score = this.calculateOverallScore(keywordMatch, atsAnalysis, strengths, weaknesses)

    return {
      score,
      strengths,
      weaknesses,
      suggestions,
      keywordMatch,
      atsScore: atsAnalysis.score
    }
  }

  /**
   * Analyze keyword match between student profile and opportunity
   */
  private static analyzeKeywords(
    student: IStudent,
    opportunity: IOpportunity
  ): KeywordMatch[] {
    const requiredSkills = opportunity.requirements.skills
    const requiredEducation = opportunity.requirements.education
    const jobDescription = `${opportunity.title} ${opportunity.description}`.toLowerCase()
    
    const keywordMatches: KeywordMatch[] = []

    // Analyze skills
    for (const skill of requiredSkills) {
      const studentHasSkill = student.skills.some(s => 
        s.name.toLowerCase() === skill.toLowerCase()
      )
      
      keywordMatches.push({
        keyword: skill,
        found: studentHasSkill,
        importance: 'high',
        suggestions: studentHasSkill ? [] : [`Add ${skill} to your skills section`]
      })
    }

    // Analyze education
    for (const education of requiredEducation) {
      const studentEducation = `${student.academicInfo.program} ${student.academicInfo.department}`.toLowerCase()
      const educationMatch = studentEducation.includes(education.toLowerCase())
      
      keywordMatches.push({
        keyword: education,
        found: educationMatch,
        importance: 'medium',
        suggestions: educationMatch ? [] : [`Highlight your ${education} background`]
      })
    }

    // Analyze experience keywords
    const experienceKeywords = this.extractExperienceKeywords(jobDescription)
    for (const keyword of experienceKeywords) {
      const foundInExperience = student.experience.some(exp => 
        exp.description.toLowerCase().includes(keyword.toLowerCase()) ||
        exp.title.toLowerCase().includes(keyword.toLowerCase())
      )
      
      keywordMatches.push({
        keyword,
        found: foundInExperience,
        importance: 'medium',
        suggestions: foundInExperience ? [] : [`Include ${keyword} in your experience descriptions`]
      })
    }

    return keywordMatches
  }

  /**
   * Analyze ATS (Applicant Tracking System) compatibility
   */
  private static analyzeATS(
    student: IStudent,
    resumeContent?: string
  ): ATSAnalysis {
    const issues: string[] = []
    const recommendations: string[] = []

    // Check for essential sections
    const hasContactInfo = student.profile.phone && student.profile.email
    const hasEducation = student.academicInfo.university && student.academicInfo.program
    const hasExperience = student.experience.length > 0
    const hasSkills = student.skills.length > 0

    if (!hasContactInfo) {
      issues.push('Missing contact information')
      recommendations.push('Include phone number and email address')
    }

    if (!hasEducation) {
      issues.push('Missing education section')
      recommendations.push('Add your educational background')
    }

    if (!hasExperience) {
      issues.push('No work experience listed')
      recommendations.push('Include internships, projects, or volunteer work')
    }

    if (!hasSkills) {
      issues.push('No skills section')
      recommendations.push('Add a skills section with relevant technical skills')
    }

    // Check for resume content if provided
    if (resumeContent) {
      const contentAnalysis = this.analyzeResumeContent(resumeContent)
      issues.push(...contentAnalysis.issues)
      recommendations.push(...contentAnalysis.recommendations)
    }

    const score = Math.max(0, 100 - (issues.length * 15))
    
    return {
      score,
      issues,
      recommendations
    }
  }

  /**
   * Analyze resume content for ATS compatibility
   */
  private static analyzeResumeContent(content: string): {
    issues: string[]
    recommendations: string[]
  } {
    const issues: string[] = []
    const recommendations: string[] = []

    // Check for common ATS issues
    if (content.includes('@') && !content.includes('@gmail.com') && !content.includes('@yahoo.com')) {
      // Check for professional email
    }

    if (content.length < 200) {
      issues.push('Resume too short')
      recommendations.push('Add more detailed descriptions of your experience')
    }

    if (content.length > 2000) {
      issues.push('Resume too long')
      recommendations.push('Keep resume concise and relevant')
    }

    // Check for action verbs
    const actionVerbs = ['developed', 'created', 'implemented', 'designed', 'managed', 'led', 'improved']
    const hasActionVerbs = actionVerbs.some(verb => content.toLowerCase().includes(verb))
    
    if (!hasActionVerbs) {
      issues.push('Missing action verbs')
      recommendations.push('Use strong action verbs to describe your achievements')
    }

    return { issues, recommendations }
  }

  /**
   * Generate optimization suggestions
   */
  private static generateSuggestions(
    student: IStudent,
    opportunity: IOpportunity,
    keywordMatches: KeywordMatch[]
  ): ResumeSuggestion[] {
    const suggestions: ResumeSuggestion[] = []

    // High priority suggestions
    const missingHighPriorityKeywords = keywordMatches.filter(
      km => !km.found && km.importance === 'high'
    )

    if (missingHighPriorityKeywords.length > 0) {
      suggestions.push({
        category: 'skills',
        priority: 'high',
        title: 'Add Missing Skills',
        description: `Include these required skills: ${missingHighPriorityKeywords.map(km => km.keyword).join(', ')}`,
        action: 'Add these skills to your resume and LinkedIn profile'
      })
    }

    // Experience suggestions
    if (student.experience.length === 0) {
      suggestions.push({
        category: 'experience',
        priority: 'high',
        title: 'Add Work Experience',
        description: 'Include internships, projects, or volunteer work to demonstrate your skills',
        action: 'Add relevant experience to your profile'
      })
    }

    // Education suggestions
    const educationMatch = opportunity.requirements.education.some(edu =>
      student.academicInfo.program.toLowerCase().includes(edu.toLowerCase()) ||
      student.academicInfo.department.toLowerCase().includes(edu.toLowerCase())
    )

    if (!educationMatch) {
      suggestions.push({
        category: 'education',
        priority: 'medium',
        title: 'Highlight Relevant Education',
        description: 'Emphasize how your education aligns with the role requirements',
        action: 'Update your education section to highlight relevant coursework'
      })
    }

    // Format suggestions
    suggestions.push({
      category: 'format',
      priority: 'medium',
      title: 'Optimize Resume Format',
      description: 'Use a clean, ATS-friendly format with clear section headers',
      action: 'Use a standard resume template and avoid graphics or complex formatting'
    })

    // Content suggestions
    suggestions.push({
      category: 'content',
      priority: 'low',
      title: 'Quantify Achievements',
      description: 'Add numbers and metrics to your experience descriptions',
      action: 'Include specific results and achievements in your experience'
    })

    return suggestions
  }

  /**
   * Identify student strengths
   */
  private static identifyStrengths(
    student: IStudent,
    opportunity: IOpportunity
  ): string[] {
    const strengths: string[] = []

    // Skill strengths
    const matchedSkills = opportunity.requirements.skills.filter(skill =>
      student.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    )

    if (matchedSkills.length > 0) {
      strengths.push(`Strong technical skills: ${matchedSkills.join(', ')}`)
    }

    // Experience strengths
    if (student.experience.length > 0) {
      strengths.push('Relevant work experience')
    }

    // Academic strengths
    if (student.academicInfo.cgpa >= 8.0) {
      strengths.push('Strong academic performance')
    }

    // Certification strengths
    if (student.certifications.length > 0) {
      strengths.push('Professional certifications')
    }

    return strengths
  }

  /**
   * Identify areas for improvement
   */
  private static identifyWeaknesses(
    student: IStudent,
    opportunity: IOpportunity,
    keywordMatches: KeywordMatch[]
  ): string[] {
    const weaknesses: string[] = []

    // Missing skills
    const missingSkills = keywordMatches.filter(km => !km.found && km.importance === 'high')
    if (missingSkills.length > 0) {
      weaknesses.push(`Missing key skills: ${missingSkills.map(km => km.keyword).join(', ')}`)
    }

    // Experience gaps
    if (student.experience.length === 0) {
      weaknesses.push('No work experience listed')
    }

    // Education mismatch
    const educationMatch = opportunity.requirements.education.some(edu =>
      student.academicInfo.program.toLowerCase().includes(edu.toLowerCase())
    )
    if (!educationMatch) {
      weaknesses.push('Education may not align with requirements')
    }

    return weaknesses
  }

  /**
   * Calculate overall resume score
   */
  private static calculateOverallScore(
    keywordMatches: KeywordMatch[],
    atsAnalysis: ATSAnalysis,
    strengths: string[],
    weaknesses: string[]
  ): number {
    const keywordScore = keywordMatches.filter(km => km.found).length / keywordMatches.length
    const atsScore = atsAnalysis.score / 100
    const strengthScore = Math.min(strengths.length / 5, 1) // Max 5 strengths
    const weaknessPenalty = Math.max(0, 1 - (weaknesses.length * 0.1))

    return Math.round((keywordScore * 0.4 + atsScore * 0.3 + strengthScore * 0.2 + weaknessPenalty * 0.1) * 100)
  }

  /**
   * Extract experience-related keywords from job description
   */
  private static extractExperienceKeywords(jobDescription: string): string[] {
    const commonExperienceKeywords = [
      'leadership', 'management', 'team', 'project', 'development',
      'design', 'analysis', 'research', 'collaboration', 'communication',
      'problem-solving', 'innovation', 'strategy', 'implementation'
    ]

    return commonExperienceKeywords.filter(keyword =>
      jobDescription.includes(keyword)
    )
  }

  /**
   * Generate personalized resume tips
   */
  static generateResumeTips(student: IStudent): string[] {
    const tips: string[] = []

    // General tips
    tips.push('Use action verbs to start each bullet point')
    tips.push('Quantify your achievements with specific numbers')
    tips.push('Tailor your resume for each job application')
    tips.push('Keep your resume to 1-2 pages maximum')

    // Student-specific tips
    if (student.experience.length === 0) {
      tips.push('Include relevant coursework and projects')
      tips.push('Highlight academic achievements and leadership roles')
    }

    if (student.skills.length < 5) {
      tips.push('Add more technical skills to your profile')
    }

    if (student.certifications.length === 0) {
      tips.push('Consider earning relevant certifications')
    }

    return tips
  }

  /**
   * Generate cover letter suggestions
   */
  static generateCoverLetterSuggestions(
    student: IStudent,
    opportunity: IOpportunity
  ): {
    opening: string
    body: string[]
    closing: string
  } {
    const matchedSkills = opportunity.requirements.skills.filter(skill =>
      student.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    )

    const opening = `I am excited to apply for the ${opportunity.title} position at ${opportunity.company.name}. With my background in ${student.academicInfo.department} and experience in ${matchedSkills.slice(0, 3).join(', ')}, I am confident I would be a valuable addition to your team.`

    const body = [
      `As a ${student.academicInfo.program} student at ${student.academicInfo.university}, I have developed strong skills in ${matchedSkills.slice(0, 2).join(' and ')}.`,
      `My experience includes ${student.experience.length > 0 ? student.experience[0].title : 'academic projects'} where I ${student.experience.length > 0 ? 'gained practical experience' : 'applied theoretical knowledge'} in relevant technologies.`,
      `I am particularly drawn to this opportunity because ${this.generateInterestReason(opportunity)}.`
    ]

    const closing = `I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to ${opportunity.company.name}'s continued success. Thank you for considering my application.`

    return { opening, body, closing }
  }

  /**
   * Generate interest reason based on opportunity
   */
  private static generateInterestReason(opportunity: IOpportunity): string {
    const reasons = [
      `it aligns with my career goals in ${opportunity.category}`,
      `I am passionate about ${opportunity.company.industry}`,
      `it offers the opportunity to work with cutting-edge technologies`,
      `it provides a great learning environment for professional growth`
    ]

    return reasons[Math.floor(Math.random() * reasons.length)]
  }
}

export default ResumeOptimizer
