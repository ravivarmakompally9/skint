import { IStudent } from '@/models/Student'
import { IOpportunity } from '@/models/Opportunity'
import { IApplication } from '@/models/Application'

interface RecommendationScore {
  opportunityId: string
  score: number
  reasons: string[]
  matchPercentage: number
}

interface SkillMatch {
  skill: string
  studentLevel: string
  requiredLevel: string
  match: boolean
}

interface RecommendationFactors {
  skillMatch: number
  experienceMatch: number
  locationMatch: number
  salaryMatch: number
  companySizeMatch: number
  workModeMatch: number
  academicMatch: number
}

export class AIRecommendationEngine {
  /**
   * Generate personalized opportunity recommendations for a student
   */
  static async getRecommendations(
    student: IStudent,
    opportunities: IOpportunity[],
    studentApplications: IApplication[]
  ): Promise<RecommendationScore[]> {
    const appliedOpportunityIds = studentApplications.map(app => 
      app.opportunityId.toString()
    )

    const recommendations: RecommendationScore[] = []

    for (const opportunity of opportunities) {
      // Skip if already applied
      if (appliedOpportunityIds.includes(opportunity._id.toString())) {
        continue
      }

      const factors = this.calculateMatchFactors(student, opportunity)
      const score = this.calculateOverallScore(factors)
      const reasons = this.generateReasons(factors, student, opportunity)
      const matchPercentage = Math.round(score * 100)

      if (score > 0.3) { // Only recommend if score is above 30%
        recommendations.push({
          opportunityId: opportunity._id.toString(),
          score,
          reasons,
          matchPercentage
        })
      }
    }

    // Sort by score (highest first)
    return recommendations.sort((a, b) => b.score - a.score)
  }

  /**
   * Calculate match factors between student and opportunity
   */
  private static calculateMatchFactors(
    student: IStudent,
    opportunity: IOpportunity
  ): RecommendationFactors {
    return {
      skillMatch: this.calculateSkillMatch(student, opportunity),
      experienceMatch: this.calculateExperienceMatch(student, opportunity),
      locationMatch: this.calculateLocationMatch(student, opportunity),
      salaryMatch: this.calculateSalaryMatch(student, opportunity),
      companySizeMatch: this.calculateCompanySizeMatch(student, opportunity),
      workModeMatch: this.calculateWorkModeMatch(student, opportunity),
      academicMatch: this.calculateAcademicMatch(student, opportunity)
    }
  }

  /**
   * Calculate skill match percentage
   */
  private static calculateSkillMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const requiredSkills = opportunity.requirements.skills
    const studentSkills = student.skills.map(s => s.name.toLowerCase())
    
    if (requiredSkills.length === 0) return 0.5 // Neutral if no skills required

    const matchedSkills = requiredSkills.filter(skill => 
      studentSkills.includes(skill.toLowerCase())
    )

    // Check skill levels for matched skills
    const skillMatches: SkillMatch[] = []
    for (const requiredSkill of requiredSkills) {
      const studentSkill = student.skills.find(s => 
        s.name.toLowerCase() === requiredSkill.toLowerCase()
      )
      
      if (studentSkill) {
        const levelMatch = this.compareSkillLevels(
          studentSkill.level,
          'intermediate' // Default required level
        )
        skillMatches.push({
          skill: requiredSkill,
          studentLevel: studentSkill.level,
          requiredLevel: 'intermediate',
          match: levelMatch
        })
      }
    }

    const exactMatches = skillMatches.filter(sm => sm.match).length
    const partialMatches = skillMatches.length - exactMatches

    return (exactMatches * 1.0 + partialMatches * 0.5) / requiredSkills.length
  }

  /**
   * Calculate experience match
   */
  private static calculateExperienceMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const requiredExp = opportunity.requirements.experience.min
    const studentExp = this.calculateStudentExperience(student)

    if (requiredExp === 0) return 1.0 // Perfect match for entry-level

    if (studentExp >= requiredExp) {
      return 1.0 // Student has sufficient experience
    } else {
      return studentExp / requiredExp // Partial match based on experience ratio
    }
  }

  /**
   * Calculate location match
   */
  private static calculateLocationMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const studentLocation = student.preferences.locations
    const opportunityLocation = opportunity.location

    // If remote work is available and student prefers remote
    if (opportunity.location.isRemote && 
        student.preferences.workMode === 'remote') {
      return 1.0
    }

    // Check if opportunity location matches student preferences
    const locationMatch = studentLocation.some(loc => 
      loc.toLowerCase().includes(opportunityLocation.city.toLowerCase()) ||
      loc.toLowerCase().includes(opportunityLocation.state.toLowerCase()) ||
      loc.toLowerCase().includes(opportunityLocation.country.toLowerCase())
    )

    return locationMatch ? 1.0 : 0.3 // Partial match if no location preference
  }

  /**
   * Calculate salary match
   */
  private static calculateSalaryMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const studentSalaryRange = student.preferences.salaryRange
    const opportunitySalary = opportunity.benefits.salary

    // Convert opportunity salary to yearly equivalent
    let opportunityYearly = opportunitySalary.min
    if (opportunitySalary.period === 'hourly') {
      opportunityYearly = opportunitySalary.min * 2080 // 40 hours * 52 weeks
    } else if (opportunitySalary.period === 'monthly') {
      opportunityYearly = opportunitySalary.min * 12
    }

    if (opportunityYearly >= studentSalaryRange.min && 
        opportunityYearly <= studentSalaryRange.max) {
      return 1.0 // Perfect match
    } else if (opportunityYearly >= studentSalaryRange.min * 0.8) {
      return 0.7 // Close match
    } else {
      return 0.3 // Partial match
    }
  }

  /**
   * Calculate company size match
   */
  private static calculateCompanySizeMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const studentPreference = student.preferences.companySize
    const opportunitySize = opportunity.company.size

    const sizeMapping = {
      'startup': 0,
      'small': 1,
      'medium': 2,
      'large': 3,
      'enterprise': 4
    }

    const studentSizeValue = sizeMapping[studentPreference as keyof typeof sizeMapping] || 2
    const opportunitySizeValue = sizeMapping[opportunitySize] || 2

    const difference = Math.abs(studentSizeValue - opportunitySizeValue)
    return Math.max(0, 1 - difference * 0.25) // Decrease score based on difference
  }

  /**
   * Calculate work mode match
   */
  private static calculateWorkModeMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const studentPreference = student.preferences.workMode
    const opportunityMode = opportunity.location.workMode

    if (studentPreference === opportunityMode) {
      return 1.0 // Perfect match
    } else if (studentPreference === 'hybrid' || opportunityMode === 'hybrid') {
      return 0.7 // Partial match for hybrid
    } else {
      return 0.3 // Low match for remote vs onsite
    }
  }

  /**
   * Calculate academic match
   */
  private static calculateAcademicMatch(
    student: IStudent,
    opportunity: IOpportunity
  ): number {
    const studentProgram = student.academicInfo.program.toLowerCase()
    const studentDepartment = student.academicInfo.department.toLowerCase()
    const requiredEducation = opportunity.requirements.education

    // Check if student's program/department matches requirements
    const educationMatch = requiredEducation.some(edu => 
      studentProgram.includes(edu.toLowerCase()) ||
      studentDepartment.includes(edu.toLowerCase())
    )

    return educationMatch ? 1.0 : 0.5 // Partial match if no specific education requirement
  }

  /**
   * Calculate overall recommendation score
   */
  private static calculateOverallScore(factors: RecommendationFactors): number {
    const weights = {
      skillMatch: 0.25,
      experienceMatch: 0.20,
      locationMatch: 0.15,
      salaryMatch: 0.15,
      companySizeMatch: 0.10,
      workModeMatch: 0.10,
      academicMatch: 0.05
    }

    return Object.entries(factors).reduce((score, [factor, value]) => {
      return score + (value * weights[factor as keyof typeof weights])
    }, 0)
  }

  /**
   * Generate human-readable reasons for recommendation
   */
  private static generateReasons(
    factors: RecommendationFactors,
    student: IStudent,
    opportunity: IOpportunity
  ): string[] {
    const reasons: string[] = []

    if (factors.skillMatch > 0.7) {
      reasons.push('Strong skill match with your technical background')
    }

    if (factors.experienceMatch > 0.8) {
      reasons.push('Experience level aligns well with requirements')
    }

    if (factors.locationMatch > 0.8) {
      reasons.push('Location matches your preferences')
    }

    if (factors.salaryMatch > 0.8) {
      reasons.push('Compensation meets your salary expectations')
    }

    if (factors.companySizeMatch > 0.8) {
      reasons.push('Company size aligns with your preferences')
    }

    if (factors.workModeMatch > 0.8) {
      reasons.push('Work mode matches your preferences')
    }

    if (factors.academicMatch > 0.8) {
      reasons.push('Educational background is a good fit')
    }

    // Add specific skill matches
    const matchedSkills = opportunity.requirements.skills.filter(skill =>
      student.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    )

    if (matchedSkills.length > 0) {
      reasons.push(`You have experience with: ${matchedSkills.join(', ')}`)
    }

    return reasons
  }

  /**
   * Calculate student's total experience in years
   */
  private static calculateStudentExperience(student: IStudent): number {
    const now = new Date()
    let totalExperience = 0

    for (const exp of student.experience) {
      const startDate = new Date(exp.startDate)
      const endDate = exp.endDate ? new Date(exp.endDate) : now
      const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      totalExperience += duration
    }

    return totalExperience
  }

  /**
   * Compare skill levels
   */
  private static compareSkillLevels(
    studentLevel: string,
    requiredLevel: string
  ): boolean {
    const levelOrder = ['beginner', 'intermediate', 'advanced', 'expert']
    const studentIndex = levelOrder.indexOf(studentLevel)
    const requiredIndex = levelOrder.indexOf(requiredLevel)

    return studentIndex >= requiredIndex
  }

  /**
   * Get skill gap analysis for a student
   */
  static async getSkillGapAnalysis(
    student: IStudent,
    opportunities: IOpportunity[]
  ): Promise<{
    missingSkills: string[]
    skillLevels: { skill: string; current: string; recommended: string }[]
    recommendations: string[]
  }> {
    const allRequiredSkills = new Set<string>()
    const skillLevels = new Map<string, string>()

    // Collect all skills from opportunities
    for (const opportunity of opportunities) {
      for (const skill of opportunity.requirements.skills) {
        allRequiredSkills.add(skill.toLowerCase())
        skillLevels.set(skill.toLowerCase(), 'intermediate') // Default level
      }
    }

    const studentSkills = new Set(
      student.skills.map(s => s.name.toLowerCase())
    )

    const missingSkills = Array.from(allRequiredSkills).filter(
      skill => !studentSkills.has(skill)
    )

    const skillLevelAnalysis = Array.from(allRequiredSkills).map(skill => {
      const studentSkill = student.skills.find(s => 
        s.name.toLowerCase() === skill.toLowerCase()
      )
      
      return {
        skill,
        current: studentSkill?.level || 'none',
        recommended: skillLevels.get(skill) || 'intermediate'
      }
    })

    const recommendations = this.generateSkillRecommendations(
      missingSkills,
      skillLevelAnalysis
    )

    return {
      missingSkills,
      skillLevels: skillLevelAnalysis,
      recommendations
    }
  }

  /**
   * Generate skill development recommendations
   */
  private static generateSkillRecommendations(
    missingSkills: string[],
    skillLevelAnalysis: { skill: string; current: string; recommended: string }[]
  ): string[] {
    const recommendations: string[] = []

    if (missingSkills.length > 0) {
      recommendations.push(
        `Consider learning: ${missingSkills.slice(0, 3).join(', ')}`
      )
    }

    const lowLevelSkills = skillLevelAnalysis.filter(
      s => s.current !== 'none' && s.current === 'beginner' && s.recommended === 'advanced'
    )

    if (lowLevelSkills.length > 0) {
      recommendations.push(
        `Improve your skills in: ${lowLevelSkills.map(s => s.skill).join(', ')}`
      )
    }

    return recommendations
  }
}

export default AIRecommendationEngine
