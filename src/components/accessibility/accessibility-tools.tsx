'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Type, 
  Contrast, 
  MousePointer,
  Keyboard,
  Settings,
  RotateCcw,
  CheckCircle
} from 'lucide-react'

interface AccessibilitySettings {
  fontSize: number
  contrast: 'normal' | 'high' | 'inverted'
  animations: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
  colorBlind: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  audioDescriptions: boolean
  voiceOver: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  contrast: 'normal',
  animations: true,
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  focusIndicators: true,
  colorBlind: 'normal',
  audioDescriptions: false,
  voiceOver: false
}

export default function AccessibilityTools() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Apply accessibility settings to document
    applyAccessibilitySettings()
  }, [settings])

  const applyAccessibilitySettings = () => {
    const root = document.documentElement
    
    // Font size
    root.style.fontSize = `${settings.fontSize}px`
    
    // Contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast')
    } else if (settings.contrast === 'inverted') {
      root.classList.add('inverted-colors')
    } else {
      root.classList.remove('high-contrast', 'inverted-colors')
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
    
    // Color blind support
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia')
    if (settings.colorBlind !== 'normal') {
      root.classList.add(settings.colorBlind)
    }
    
    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('focus-indicators')
    } else {
      root.classList.remove('focus-indicators')
    }
  }

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const presetProfiles = [
    {
      name: 'Visual Impairment',
      description: 'High contrast, large text, screen reader support',
      settings: {
        fontSize: 20,
        contrast: 'high' as const,
        screenReader: true,
        focusIndicators: true
      }
    },
    {
      name: 'Motor Impairment',
      description: 'Keyboard navigation, large click targets',
      settings: {
        keyboardNavigation: true,
        focusIndicators: true,
        fontSize: 18
      }
    },
    {
      name: 'Cognitive Impairment',
      description: 'Reduced motion, clear focus indicators',
      settings: {
        reducedMotion: true,
        focusIndicators: true,
        animations: false
      }
    },
    {
      name: 'Color Blind',
      description: 'Color blind friendly interface',
      settings: {
        colorBlind: 'deuteranopia' as const,
        contrast: 'high' as const
      }
    }
  ]

  return (
    <>
      {/* Accessibility Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          aria-label="Open accessibility tools"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-96 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Accessibility className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Accessibility</h2>
                    <p className="text-sm text-gray-500">Customize your experience</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </Button>
              </div>

              <div className="p-4 space-y-6">
                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800 dark:text-green-200">
                        Settings applied successfully!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Presets */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Presets</CardTitle>
                    <CardDescription>Choose a preset for common accessibility needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {presetProfiles.map((profile, index) => (
                      <Button
                        key={profile.name}
                        variant="outline"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => {
                          setSettings(prev => ({ ...prev, ...profile.settings }))
                          setShowSuccess(true)
                          setTimeout(() => setShowSuccess(false), 2000)
                        }}
                      >
                        <div className="text-left">
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-xs text-gray-500">{profile.description}</div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Visual Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <span>Visual Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Font Size: {settings.fontSize}px
                      </label>
                      <Slider
                        value={[settings.fontSize]}
                        onValueChange={([value]) => updateSetting('fontSize', value)}
                        min={12}
                        max={24}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Contrast</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['normal', 'high', 'inverted'] as const).map(contrast => (
                          <Button
                            key={contrast}
                            variant={settings.contrast === contrast ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateSetting('contrast', contrast)}
                            className="capitalize"
                          >
                            {contrast}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Color Blind Support</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['normal', 'deuteranopia', 'protanopia', 'tritanopia'] as const).map(type => (
                          <Button
                            key={type}
                            variant={settings.colorBlind === type ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateSetting('colorBlind', type)}
                            className="capitalize"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Motion Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MousePointer className="h-5 w-5 text-green-600" />
                      <span>Motion & Animation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Enable Animations</label>
                        <p className="text-xs text-gray-500">Smooth transitions and effects</p>
                      </div>
                      <Switch
                        checked={settings.animations}
                        onCheckedChange={(checked) => updateSetting('animations', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Reduce Motion</label>
                        <p className="text-xs text-gray-500">Minimize animations for comfort</p>
                      </div>
                      <Switch
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Keyboard className="h-5 w-5 text-purple-600" />
                      <span>Navigation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Keyboard Navigation</label>
                        <p className="text-xs text-gray-500">Navigate with Tab key</p>
                      </div>
                      <Switch
                        checked={settings.keyboardNavigation}
                        onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Focus Indicators</label>
                        <p className="text-xs text-gray-500">Highlight focused elements</p>
                      </div>
                      <Switch
                        checked={settings.focusIndicators}
                        onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Audio Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-orange-600" />
                      <span>Audio Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Screen Reader</label>
                        <p className="text-xs text-gray-500">Optimize for screen readers</p>
                      </div>
                      <Switch
                        checked={settings.screenReader}
                        onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Audio Descriptions</label>
                        <p className="text-xs text-gray-500">Describe visual content</p>
                      </div>
                      <Switch
                        checked={settings.audioDescriptions}
                        onCheckedChange={(checked) => updateSetting('audioDescriptions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Voice Over</label>
                        <p className="text-xs text-gray-500">Text-to-speech support</p>
                      </div>
                      <Switch
                        checked={settings.voiceOver}
                        onCheckedChange={(checked) => updateSetting('voiceOver', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={resetSettings}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
