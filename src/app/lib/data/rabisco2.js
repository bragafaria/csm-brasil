// Polish this text. Output the same structure (Keep the exact structure, keys, arrays, and formatting.). The idea is NOT to reduce the amount of words but make it more user friendly. Do not use long dashes. If there are Long Dashes, remove it:

// 1. C-L-O-S-H/C-L-O-S-H → Architect / Architect ok
// 2. C-L-O-S-H/C-L-O-S-A → Architect / Engineer ok
// 3. C-L-O-S-H/C-L-O-F-H → Architect / Navigator ok
// 4. C-L-O-S-H/C-L-O-F-A → Architect / Pioneer ok
// 5. C-L-O-S-H/C-L-I-S-H → Architect / Curator ok
// 6. C-L-O-S-H/C-L-I-S-A → Architect / Analyst ok
// 7. C-L-O-S-H/C-L-I-F-H → Architect / Mediator ok
// 8. C-L-O-S-H/C-L-I-F-A → Architect / Maverick ok
// 9. C-L-O-S-H/C-V-O-S-H → Architect / Steward ok
// 10. C-L-O-S-H/C-V-O-S-A → Architect / Artisan ok
// 11. C-L-O-S-H/C-V-O-F-H → Architect / Campaigner ok
// 12. C-L-O-S-H/C-V-O-F-A → Architect / Adventurer ok
// 13. C-L-O-S-H/C-V-I-S-H → Architect / Counselor ok
// 14. C-L-O-S-H/C-V-I-S-A → Architect / Healer ok
// 15. C-L-O-S-H/C-V-I-F-H → Architect / Peacemaker ok
// 16. C-L-O-S-H/C-V-I-F-A → Architect / Empath ok
// 17. C-L-O-S-H/N-L-O-S-H → Architect / Strategist ok
// 18. C-L-O-S-H/N-L-O-S-A → Architect / Inventor ok
// 19. C-L-O-S-H/N-L-O-F-H → Architect / Disruptor ok
// 20. C-L-O-S-H/N-L-O-F-A → Architect / Revolutionary ok
// 21. C-L-O-S-H/N-L-I-S-H → Architect / Academic ok
// 22. C-L-O-S-H/N-L-I-S-A → Architect / Theorist ok
// 23. C-L-O-S-H/N-L-I-F-H → Architect / Innovator ok
// 24. C-L-O-S-H/N-L-I-F-A → Architect / Visionary ok
// 25. C-L-O-S-H/N-V-O-S-H → Architect / Ambassador ok
// 26. C-L-O-S-H/N-V-O-S-A → Architect / Artist ok
// 27. C-L-O-S-H/N-V-O-F-H → Architect / Catalyst ok
// 28. C-L-O-S-H/N-V-O-F-A → Architect / Wanderer ok
// 29. C-L-O-S-H/N-V-I-S-H → Architect / Mentor ok
// 30. C-L-O-S-H/N-V-I-S-A → Architect / Sage ok
// 31. C-L-O-S-H/N-V-I-F-H → Architect / Unifier ok
// 32. C-L-O-S-H/N-V-I-F-A → Architect / Mystic ok
// 33. C-L-O-S-A/C-L-O-S-A → Engineer / Engineer ok
// 34. C-L-O-S-A/C-L-O-F-H → Engineer / Navigator ok
// 35. C-L-O-S-A/C-L-O-F-A → Engineer / Pioneer ok
// 36. C-L-O-S-A/C-L-I-S-H → Engineer / Curator ok
// 37. C-L-O-S-A/C-L-I-S-A → Engineer / Analyst ok
// 38. C-L-O-S-A/C-L-I-F-H → Engineer / Mediator ok
// 39. C-L-O-S-A/C-L-I-F-A → Engineer / Maverick ok
// 40. C-L-O-S-A/C-V-O-S-H → Engineer / Steward ok
// 41. C-L-O-S-A/C-V-O-S-A → Engineer / Artisan ok
// 42. C-L-O-S-A/C-V-O-F-H → Engineer / Campaigner ok
// 43. C-L-O-S-A/C-V-O-F-A → Engineer / Adventurer ok
// 44. C-L-O-S-A/C-V-I-S-H → Engineer / Counselor ok
// 45. C-L-O-S-A/C-V-I-S-A → Engineer / Healer ok
// 46. C-L-O-S-A/C-V-I-F-H → Engineer / Peacemaker ok
// 47. C-L-O-S-A/C-V-I-F-A → Engineer / Empath up ok
// 48. C-L-O-S-A/N-L-O-S-H → Engineer / Strategist ok
// 49. C-L-O-S-A/N-L-O-S-A → Engineer / Inventor ok
// 50. C-L-O-S-A/N-L-O-F-H → Engineer / Disruptor ok
// 51. C-L-O-S-A/N-L-O-F-A → Engineer / Revolutionary ok
// 52. C-L-O-S-A/N-L-I-S-H → Engineer / Academic ok
// 53. C-L-O-S-A/N-L-I-S-A → Engineer / Theorist ok
// 54. C-L-O-S-A/N-L-I-F-H → Engineer / Innovator ok
// 55. C-L-O-S-A/N-L-I-F-A → Engineer / Visionary ok
// 56. C-L-O-S-A/N-V-O-S-H → Engineer / Ambassador ok
// 57. C-L-O-S-A/N-V-O-S-A → Engineer / Artist ok
// 58. C-L-O-S-A/N-V-O-F-H → Engineer / Catalyst ok
// 59. C-L-O-S-A/N-V-O-F-A → Engineer / Wanderer ok
// 60. C-L-O-S-A/N-V-I-S-H → Engineer / Mentor ok
// 61. C-L-O-S-A/N-V-I-S-A → Engineer / Sage ok
// 62. C-L-O-S-A/N-V-I-F-H → Engineer / Unifier ok
// 63. C-L-O-S-A/N-V-I-F-A → Engineer / Mystic ok
// 64. C-L-O-F-H/C-L-O-F-H → Navigator / Navigator ok
// 65. C-L-O-F-H/C-L-O-F-A → Navigator / Pioneer ok
// 66. C-L-O-F-H/C-L-I-S-H → Navigator / Curator ok
// 67. C-L-O-F-H/C-L-I-S-A → Navigator / Analyst ok
// 68. C-L-O-F-H/C-L-I-F-H → Navigator / Mediator ok
// 69. C-L-O-F-H/C-L-I-F-A → Navigator / Maverick ok
// 70. C-L-O-F-H/C-V-O-S-H → Navigator / Steward ok
// 71. C-L-O-F-H/C-V-O-S-A → Navigator / Artisan ok
// 72. C-L-O-F-H/C-V-O-F-H → Navigator / Campaigner ok
// 73. C-L-O-F-H/C-V-O-F-A → Navigator / Adventurer ok
// 74. C-L-O-F-H/C-V-I-S-H → Navigator / Counselor ok
// 75. C-L-O-F-H/C-V-I-S-A → Navigator / Healer ok
// 76. C-L-O-F-H/C-V-I-F-H → Navigator / Peacemaker ok
// 77. C-L-O-F-H/C-V-I-F-A → Navigator / Empath ok
// 78. C-L-O-F-H/N-L-O-S-H → Navigator / Strategist ok
// 79. C-L-O-F-H/N-L-O-S-A → Navigator / Inventor ok
// 80. C-L-O-F-H/N-L-O-F-H → Navigator / Disruptor ok
// 81. C-L-O-F-H/N-L-O-F-A → Navigator / Revolutionary ok
// 82. C-L-O-F-H/N-L-I-S-H → Navigator / Academic ok
// 83. C-L-O-F-H/N-L-I-S-A → Navigator / Theorist ok
// 84. C-L-O-F-H/N-L-I-F-H → Navigator / Innovator ok
// 85. C-L-O-F-H/N-L-I-F-A → Navigator / Visionary ok
// 86. C-L-O-F-H/N-V-O-S-H → Navigator / Ambassador ok
// 87. C-L-O-F-H/N-V-O-S-A → Navigator / Artist ok
// 88. C-L-O-F-H/N-V-O-F-H → Navigator / Catalyst ok
// 89. C-L-O-F-H/N-V-O-F-A → Navigator / Wanderer ok
// 90. C-L-O-F-H/N-V-I-S-H → Navigator / Mentor ok
// 91. C-L-O-F-H/N-V-I-S-A → Navigator / Sage ok
// 92. C-L-O-F-H/N-V-I-F-H → Navigator / Unifier ok
// 93. C-L-O-F-H/N-V-I-F-A → Navigator / Mystic ok
// 94. C-L-O-F-A/C-L-O-F-A → Pioneer / Pioneer ok
// 95. C-L-O-F-A/C-L-I-S-H → Pioneer / Curator ok
// 96. C-L-O-F-A/C-L-I-S-A → Pioneer / Analyst ok
// 97. C-L-O-F-A/C-L-I-F-H → Pioneer / Mediator ok
// 98. C-L-O-F-A/C-L-I-F-A → Pioneer / Maverick ok
// 99. C-L-O-F-A/C-V-O-S-H → Pioneer / Steward ok
// 100. C-L-O-F-A/C-V-O-S-A → Pioneer / Artisan ok
// 101. C-L-O-F-A/C-V-O-F-H → Pioneer / Campaigner ok
// 102. C-L-O-F-A/C-V-O-F-A → Pioneer / Adventurer ok
// 103. C-L-O-F-A/C-V-I-S-H → Pioneer / Counselor ok
// 104. C-L-O-F-A/C-V-I-S-A → Pioneer / Healer ok
// 105. C-L-O-F-A/C-V-I-F-H → Pioneer / Peacemaker ok
// 106. C-L-O-F-A/C-V-I-F-A → Pioneer / Empath ok
// 107. C-L-O-F-A/N-L-O-S-H → Pioneer / Strategist ok
// 108. C-L-O-F-A/N-L-O-S-A → Pioneer / Inventor ok
// 109. C-L-O-F-A/N-L-O-F-H → Pioneer / Disruptor ok
// 110. C-L-O-F-A/N-L-O-F-A → Pioneer / Revolutionary ok
// 111. C-L-O-F-A/N-L-I-S-H → Pioneer / Academic ok
// 112. C-L-O-F-A/N-L-I-S-A → Pioneer / Theorist ok
// 113. C-L-O-F-A/N-L-I-F-H → Pioneer / Innovator ok
// 114. C-L-O-F-A/N-L-I-F-A → Pioneer / Visionary ok
// 115. C-L-O-F-A/N-V-O-S-H → Pioneer / Ambassador ok
// 116. C-L-O-F-A/N-V-O-S-A → Pioneer / Artist ok
// 117. C-L-O-F-A/N-V-O-F-H → Pioneer / Catalyst ok
// 118. C-L-O-F-A/N-V-O-F-A → Pioneer / Wanderer ok
// 119. C-L-O-F-A/N-V-I-S-H → Pioneer / Mentor ok
// 120. C-L-O-F-A/N-V-I-S-A → Pioneer / Sage ok
// 121. C-L-O-F-A/N-V-I-F-H → Pioneer / Unifier ok
// 122. C-L-O-F-A/N-V-I-F-A → Pioneer / Mystic ok
// 123. C-L-I-S-H/C-L-I-S-H → Curator / Curator ok
// 124. C-L-I-S-H/C-L-I-S-A → Curator / Analyst ok
// 125. C-L-I-S-H/C-L-I-F-H → Curator / Mediator ok
// 126. C-L-I-S-H/C-L-I-F-A → Curator / Maverick ok
// 127. C-L-I-S-H/C-V-O-S-H → Curator / Steward ok
// 128. C-L-I-S-H/C-V-O-S-A → Curator / Artisan ok
// 129. C-L-I-S-H/C-V-O-F-H → Curator / Campaigner ok
// 130. C-L-I-S-H/C-V-O-F-A → Curator / Adventurer ok
// 131. C-L-I-S-H/C-V-I-S-H → Curator / Counselor ok
// 132. C-L-I-S-H/C-V-I-S-A → Curator / Healer ok
// 133. C-L-I-S-H/C-V-I-F-H → Curator / Peacemaker ok
// 134. C-L-I-S-H/C-V-I-F-A → Curator / Empath ok
// 135. C-L-I-S-H/N-L-O-S-H → Curator / Strategist ok
// 136. C-L-I-S-H/N-L-O-S-A → Curator / Inventor ok
// 137. C-L-I-S-H/N-L-O-F-H → Curator / Disruptor ok
// 138. C-L-I-S-H/N-L-O-F-A → Curator / Revolutionary ok
// 139. C-L-I-S-H/N-L-I-S-H → Curator / Academic ok
// 140. C-L-I-S-H/N-L-I-S-A → Curator / Theorist ok
// 141. C-L-I-S-H/N-L-I-F-H → Curator / Innovator ok
// 142. C-L-I-S-H/N-L-I-F-A → Curator / Visionary ok
// 143. C-L-I-S-H/N-V-O-S-H → Curator / Ambassador ok
// 144. C-L-I-S-H/N-V-O-S-A → Curator / Artist ok
// 145. C-L-I-S-H/N-V-O-F-H → Curator / Catalyst ok
// 146. C-L-I-S-H/N-V-O-F-A → Curator / Wanderer ok
// 147. C-L-I-S-H/N-V-I-S-H → Curator / Mentor ok
// 148. C-L-I-S-H/N-V-I-S-A → Curator / Sage ok
// 149. C-L-I-S-H/N-V-I-F-H → Curator / Unifier ok
// 150. C-L-I-S-H/N-V-I-F-A → Curator / Mystic ok
// 151. C-L-I-S-A/C-L-I-S-A → Analyst / Analyst
// 152. C-L-I-S-A/C-L-I-F-H → Analyst / Mediator
// 153. C-L-I-S-A/C-L-I-F-A → Analyst / Maverick
// 154. C-L-I-S-A/C-V-O-S-H → Analyst / Steward
// 155. C-L-I-S-A/C-V-O-S-A → Analyst / Artisan
// 156. C-L-I-S-A/C-V-O-F-H → Analyst / Campaigner
// 157. C-L-I-S-A/C-V-O-F-A → Analyst / Adventurer
// 158. C-L-I-S-A/C-V-I-S-H → Analyst / Counselor
// 159. C-L-I-S-A/C-V-I-S-A → Analyst / Healer
// 160. C-L-I-S-A/C-V-I-F-H → Analyst / Peacemaker
// 161. C-L-I-S-A/C-V-I-F-A → Analyst / Empath
// 162. C-L-I-S-A/N-L-O-S-H → Analyst / Strategist
// 163. C-L-I-S-A/N-L-O-S-A → Analyst / Inventor
// 164. C-L-I-S-A/N-L-O-F-H → Analyst / Disruptor
// 165. C-L-I-S-A/N-L-O-F-A → Analyst / Revolutionary
// 166. C-L-I-S-A/N-L-I-S-H → Analyst / Academic
// 167. C-L-I-S-A/N-L-I-S-A → Analyst / Theorist
// 168. C-L-I-S-A/N-L-I-F-H → Analyst / Innovator
// 169. C-L-I-S-A/N-L-I-F-A → Analyst / Visionary
// 170. C-L-I-S-A/N-V-O-S-H → Analyst / Ambassador
// 171. C-L-I-S-A/N-V-O-S-A → Analyst / Artist
// 172. C-L-I-S-A/N-V-O-F-H → Analyst / Catalyst
// 173. C-L-I-S-A/N-V-O-F-A → Analyst / Wanderer
// 174. C-L-I-S-A/N-V-I-S-H → Analyst / Mentor
// 175. C-L-I-S-A/N-V-I-S-A → Analyst / Sage
// 176. C-L-I-S-A/N-V-I-F-H → Analyst / Unifier
// 177. C-L-I-S-A/N-V-I-F-A → Analyst / Mystic
// 178. C-L-I-F-H/C-L-I-F-H → Mediator / Mediator
// 179. C-L-I-F-H/C-L-I-F-A → Mediator / Maverick
// 180. C-L-I-F-H/C-V-O-S-H → Mediator / Steward
// 181. C-L-I-F-H/C-V-O-S-A → Mediator / Artisan
// 182. C-L-I-F-H/C-V-O-F-H → Mediator / Campaigner
// 183. C-L-I-F-H/C-V-O-F-A → Mediator / Adventurer
// 184. C-L-I-F-H/C-V-I-S-H → Mediator / Counselor
// 185. C-L-I-F-H/C-V-I-S-A → Mediator / Healer
// 186. C-L-I-F-H/C-V-I-F-H → Mediator / Peacemaker
// 187. C-L-I-F-H/C-V-I-F-A → Mediator / Empath
// 188. C-L-I-F-H/N-L-O-S-H → Mediator / Strategist
// 189. C-L-I-F-H/N-L-O-S-A → Mediator / Inventor
// 190. C-L-I-F-H/N-L-O-F-H → Mediator / Disruptor
// 191. C-L-I-F-H/N-L-O-F-A → Mediator / Revolutionary
// 192. C-L-I-F-H/N-L-I-S-H → Mediator / Academic
// 193. C-L-I-F-H/N-L-I-S-A → Mediator / Theorist
// 194. C-L-I-F-H/N-L-I-F-H → Mediator / Innovator
// 195. C-L-I-F-H/N-L-I-F-A → Mediator / Visionary
// 196. C-L-I-F-H/N-V-O-S-H → Mediator / Ambassador
// 197. C-L-I-F-H/N-V-O-S-A → Mediator / Artist
// 198. C-L-I-F-H/N-V-O-F-H → Mediator / Catalyst
// 199. C-L-I-F-H/N-V-O-F-A → Mediator / Wanderer
// 200. C-L-I-F-H/N-V-I-S-H → Mediator / Mentor
// 201. C-L-I-F-H/N-V-I-S-A → Mediator / Sage
// 202. C-L-I-F-H/N-V-I-F-H → Mediator / Unifier
// 203. C-L-I-F-H/N-V-I-F-A → Mediator / Mystic
// 204. C-L-I-F-A/C-L-I-F-A → Maverick / Maverick
// 205. C-L-I-F-A/C-V-O-S-H → Maverick / Steward
// 206. C-L-I-F-A/C-V-O-S-A → Maverick / Artisan
// 207. C-L-I-F-A/C-V-O-F-H → Maverick / Campaigner
// 208. C-L-I-F-A/C-V-O-F-A → Maverick / Adventurer
// 209. C-L-I-F-A/C-V-I-S-H → Maverick / Counselor
// 210. C-L-I-F-A/C-V-I-S-A → Maverick / Healer
// 211. C-L-I-F-A/C-V-I-F-H → Maverick / Peacemaker
// 212. C-L-I-F-A/C-V-I-F-A → Maverick / Empath
// 213. C-L-I-F-A/N-L-O-S-H → Maverick / Strategist
// 214. C-L-I-F-A/N-L-O-S-A → Maverick / Inventor
// 215. C-L-I-F-A/N-L-O-F-H → Maverick / Disruptor
// 216. C-L-I-F-A/N-L-O-F-A → Maverick / Revolutionary
// 217. C-L-I-F-A/N-L-I-S-H → Maverick / Academic
// 218. C-L-I-F-A/N-L-I-S-A → Maverick / Theorist
// 219. C-L-I-F-A/N-L-I-F-H → Maverick / Innovator
// 220. C-L-I-F-A/N-L-I-F-A → Maverick / Visionary
// 221. C-L-I-F-A/N-V-O-S-H → Maverick / Ambassador
// 222. C-L-I-F-A/N-V-O-S-A → Maverick / Artist
// 223. C-L-I-F-A/N-V-O-F-H → Maverick / Catalyst
// 224. C-L-I-F-A/N-V-O-F-A → Maverick / Wanderer
// 225. C-L-I-F-A/N-V-I-S-H → Maverick / Mentor
// 226. C-L-I-F-A/N-V-I-S-A → Maverick / Sage
// 227. C-L-I-F-A/N-V-I-F-H → Maverick / Unifier
// 228. C-L-I-F-A/N-V-I-F-A → Maverick / Mystic
// 229. C-V-O-S-H/C-V-O-S-H → Steward / Steward
// 230. C-V-O-S-H/C-V-O-S-A → Steward / Artisan
// 231. C-V-O-S-H/C-V-O-F-H → Steward / Campaigner
// 232. C-V-O-S-H/C-V-O-F-A → Steward / Adventurer
// 233. C-V-O-S-H/C-V-I-S-H → Steward / Counselor
// 234. C-V-O-S-H/C-V-I-S-A → Steward / Healer
// 235. C-V-O-S-H/C-V-I-F-H → Steward / Peacemaker
// 236. C-V-O-S-H/C-V-I-F-A → Steward / Empath
// 237. C-V-O-S-H/N-L-O-S-H → Steward / Strategist
// 238. C-V-O-S-H/N-L-O-S-A → Steward / Inventor
// 239. C-V-O-S-H/N-L-O-F-H → Steward / Disruptor
// 240. C-V-O-S-H/N-L-O-F-A → Steward / Revolutionary
// 241. C-V-O-S-H/N-L-I-S-H → Steward / Academic
// 242. C-V-O-S-H/N-L-I-S-A → Steward / Theorist
// 243. C-V-O-S-H/N-L-I-F-H → Steward / Innovator
// 244. C-V-O-S-H/N-L-I-F-A → Steward / Visionary
// 245. C-V-O-S-H/N-V-O-S-H → Steward / Ambassador
// 246. C-V-O-S-H/N-V-O-S-A → Steward / Artist
// 247. C-V-O-S-H/N-V-O-F-H → Steward / Catalyst
// 248. C-V-O-S-H/N-V-O-F-A → Steward / Wanderer
// 249. C-V-O-S-H/N-V-I-S-H → Steward / Mentor
// 250. C-V-O-S-H/N-V-I-S-A → Steward / Sage
// 251. C-V-O-S-H/N-V-I-F-H → Steward / Unifier
// 252. C-V-O-S-H/N-V-I-F-A → Steward / Mystic
// 253. C-V-O-S-A/C-V-O-S-A → Artisan / Artisan
// 254. C-V-O-S-A/C-V-O-F-H → Artisan / Campaigner
// 255. C-V-O-S-A/C-V-O-F-A → Artisan / Adventurer
// 256. C-V-O-S-A/C-V-I-S-H → Artisan / Counselor
// 257. C-V-O-S-A/C-V-I-S-A → Artisan / Healer
// 258. C-V-O-S-A/C-V-I-F-H → Artisan / Peacemaker
// 259. C-V-O-S-A/C-V-I-F-A → Artisan / Empath
// 260. C-V-O-S-A/N-L-O-S-H → Artisan / Strategist
// 261. C-V-O-S-A/N-L-O-S-A → Artisan / Inventor
// 262. C-V-O-S-A/N-L-O-F-H → Artisan / Disruptor
// 263. C-V-O-S-A/N-L-O-F-A → Artisan / Revolutionary
// 264. C-V-O-S-A/N-L-I-S-H → Artisan / Academic
// 265. C-V-O-S-A/N-L-I-S-A → Artisan / Theorist
// 266. C-V-O-S-A/N-L-I-F-H → Artisan / Innovator
// 267. C-V-O-S-A/N-L-I-F-A → Artisan / Visionary
// 268. C-V-O-S-A/N-V-O-S-H → Artisan / Ambassador
// 269. C-V-O-S-A/N-V-O-S-A → Artisan / Artist
// 270. C-V-O-S-A/N-V-O-F-H → Artisan / Catalyst
// 271. C-V-O-S-A/N-V-O-F-A → Artisan / Wanderer
// 272. C-V-O-S-A/N-V-I-S-H → Artisan / Mentor
// 273. C-V-O-S-A/N-V-I-S-A → Artisan / Sage
// 274. C-V-O-S-A/N-V-I-F-H → Artisan / Unifier
// 275. C-V-O-S-A/N-V-I-F-A → Artisan / Mystic
// 276. C-V-O-F-H/C-V-O-F-H → Campaigner / Campaigner
// 277. C-V-O-F-H/C-V-O-F-A → Campaigner / Adventurer
// 278. C-V-O-F-H/C-V-I-S-H → Campaigner / Counselor
// 279. C-V-O-F-H/C-V-I-S-A → Campaigner / Healer
// 280. C-V-O-F-H/C-V-I-F-H → Campaigner / Peacemaker
// 281. C-V-O-F-H/C-V-I-F-A → Campaigner / Empath
// 282. C-V-O-F-H/N-L-O-S-H → Campaigner / Strategist
// 283. C-V-O-F-H/N-L-O-S-A → Campaigner / Inventor
// 284. C-V-O-F-H/N-L-O-F-H → Campaigner / Disruptor
// 285. C-V-O-F-H/N-L-O-F-A → Campaigner / Revolutionary
// 286. C-V-O-F-H/N-L-I-S-H → Campaigner / Academic
// 287. C-V-O-F-H/N-L-I-S-A → Campaigner / Theorist
// 288. C-V-O-F-H/N-L-I-F-H → Campaigner / Innovator
// 289. C-V-O-F-H/N-L-I-F-A → Campaigner / Visionary
// 290. C-V-O-F-H/N-V-O-S-H → Campaigner / Ambassador
// 291. C-V-O-F-H/N-V-O-S-A → Campaigner / Artist
// 292. C-V-O-F-H/N-V-O-F-H → Campaigner / Catalyst
// 293. C-V-O-F-H/N-V-O-F-A → Campaigner / Wanderer
// 294. C-V-O-F-H/N-V-I-S-H → Campaigner / Mentor
// 295. C-V-O-F-H/N-V-I-S-A → Campaigner / Sage
// 296. C-V-O-F-H/N-V-I-F-H → Campaigner / Unifier
// 297. C-V-O-F-H/N-V-I-F-A → Campaigner / Mystic
// 298. C-V-O-F-A/C-V-O-F-A → Adventurer / Adventurer
// 299. C-V-O-F-A/C-V-I-S-H → Adventurer / Counselor
// 300. C-V-O-F-A/C-V-I-S-A → Adventurer / Healer
// 301. C-V-O-F-A/C-V-I-F-H → Adventurer / Peacemaker
// 302. C-V-O-F-A/C-V-I-F-A → Adventurer / Empath
// 303. C-V-O-F-A/N-L-O-S-H → Adventurer / Strategist
// 304. C-V-O-F-A/N-L-O-S-A → Adventurer / Inventor
// 305. C-V-O-F-A/N-L-O-F-H → Adventurer / Disruptor
// 306. C-V-O-F-A/N-L-O-F-A → Adventurer / Revolutionary
// 307. C-V-O-F-A/N-L-I-S-H → Adventurer / Academic
// 308. C-V-O-F-A/N-L-I-S-A → Adventurer / Theorist
// 309. C-V-O-F-A/N-L-I-F-H → Adventurer / Innovator
// 310. C-V-O-F-A/N-L-I-F-A → Adventurer / Visionary
// 311. C-V-O-F-A/N-V-O-S-H → Adventurer / Ambassador
// 312. C-V-O-F-A/N-V-O-S-A → Adventurer / Artist
// 313. C-V-O-F-A/N-V-O-F-H → Adventurer / Catalyst
// 314. C-V-O-F-A/N-V-O-F-A → Adventurer / Wanderer
// 315. C-V-O-F-A/N-V-I-S-H → Adventurer / Mentor
// 316. C-V-O-F-A/N-V-I-S-A → Adventurer / Sage
// 317. C-V-O-F-A/N-V-I-F-H → Adventurer / Unifier
// 318. C-V-O-F-A/N-V-I-F-A → Adventurer / Mystic
// 319. C-V-I-S-H/C-V-I-S-H → Counselor / Counselor
// 320. C-V-I-S-H/C-V-I-S-A → Counselor / Healer
// 321. C-V-I-S-H/C-V-I-F-H → Counselor / Peacemaker
// 322. C-V-I-S-H/C-V-I-F-A → Counselor / Empath
// 323. C-V-I-S-H/N-L-O-S-H → Counselor / Strategist
// 324. C-V-I-S-H/N-L-O-S-A → Counselor / Inventor
// 325. C-V-I-S-H/N-L-O-F-H → Counselor / Disruptor
// 326. C-V-I-S-H/N-L-O-F-A → Counselor / Revolutionary
// 327. C-V-I-S-H/N-L-I-S-H → Counselor / Academic
// 328. C-V-I-S-H/N-L-I-S-A → Counselor / Theorist
// 329. C-V-I-S-H/N-L-I-F-H → Counselor / Innovator
// 330. C-V-I-S-H/N-L-I-F-A → Counselor / Visionary
// 331. C-V-I-S-H/N-V-O-S-H → Counselor / Ambassador
// 332. C-V-I-S-H/N-V-O-S-A → Counselor / Artist
// 333. C-V-I-S-H/N-V-O-F-H → Counselor / Catalyst
// 334. C-V-I-S-H/N-V-O-F-A → Counselor / Wanderer
// 335. C-V-I-S-H/N-V-I-S-H → Counselor / Mentor
// 336. C-V-I-S-H/N-V-I-S-A → Counselor / Sage
// 337. C-V-I-S-H/N-V-I-F-H → Counselor / Unifier
// 338. C-V-I-S-H/N-V-I-F-A → Counselor / Mystic
// 339. C-V-I-S-A/C-V-I-S-A → Healer / Healer
// 340. C-V-I-S-A/C-V-I-F-H → Healer / Peacemaker
// 341. C-V-I-S-A/C-V-I-F-A → Healer / Empath
// 342. C-V-I-S-A/N-L-O-S-H → Healer / Strategist
// 343. C-V-I-S-A/N-L-O-S-A → Healer / Inventor
// 344. C-V-I-S-A/N-L-O-F-H → Healer / Disruptor
// 345. C-V-I-S-A/N-L-O-F-A → Healer / Revolutionary
// 346. C-V-I-S-A/N-L-I-S-H → Healer / Academic
// 347. C-V-I-S-A/N-L-I-S-A → Healer / Theorist
// 348. C-V-I-S-A/N-L-I-F-H → Healer / Innovator
// 349. C-V-I-S-A/N-L-I-F-A → Healer / Visionary
// 350. C-V-I-S-A/N-V-O-S-H → Healer / Ambassador
// 351. C-V-I-S-A/N-V-O-S-A → Healer / Artist
// 352. C-V-I-S-A/N-V-O-F-H → Healer / Catalyst
// 353. C-V-I-S-A/N-V-O-F-A → Healer / Wanderer
// 354. C-V-I-S-A/N-V-I-S-H → Healer / Mentor
// 355. C-V-I-S-A/N-V-I-S-A → Healer / Sage
// 356. C-V-I-S-A/N-V-I-F-H → Healer / Unifier
// 357. C-V-I-S-A/N-V-I-F-A → Healer / Mystic
// 358. C-V-I-F-H/C-V-I-F-H → Peacemaker / Peacemaker
// 359. C-V-I-F-H/C-V-I-F-A → Peacemaker / Empath
// 360. C-V-I-F-H/N-L-O-S-H → Peacemaker / Strategist
// 361. C-V-I-F-H/N-L-O-S-A → Peacemaker / Inventor
// 362. C-V-I-F-H/N-L-O-F-H → Peacemaker / Disruptor
// 363. C-V-I-F-H/N-L-O-F-A → Peacemaker / Revolutionary
// 364. C-V-I-F-H/N-L-I-S-H → Peacemaker / Academic
// 365. C-V-I-F-H/N-L-I-S-A → Peacemaker / Theorist
// 366. C-V-I-F-H/N-L-I-F-H → Peacemaker / Innovator
// 367. C-V-I-F-H/N-L-I-F-A → Peacemaker / Visionary
// 368. C-V-I-F-H/N-V-O-S-H → Peacemaker / Ambassador
// 369. C-V-I-F-H/N-V-O-S-A → Peacemaker / Artist
// 370. C-V-I-F-H/N-V-O-F-H → Peacemaker / Catalyst
// 371. C-V-I-F-H/N-V-O-F-A → Peacemaker / Wanderer
// 372. C-V-I-F-H/N-V-I-S-H → Peacemaker / Mentor
// 373. C-V-I-F-H/N-V-I-S-A → Peacemaker / Sage
// 374. C-V-I-F-H/N-V-I-F-H → Peacemaker / Unifier
// 375. C-V-I-F-H/N-V-I-F-A → Peacemaker / Mystic
// 376. C-V-I-F-A/C-V-I-F-A → Empath / Empath
// 377. C-V-I-F-A/N-L-O-S-H → Empath / Strategist
// 378. C-V-I-F-A/N-L-O-S-A → Empath / Inventor
// 379. C-V-I-F-A/N-L-O-F-H → Empath / Disruptor
// 380. C-V-I-F-A/N-L-O-F-A → Empath / Revolutionary
// 381. C-V-I-F-A/N-L-I-S-H → Empath / Academic
// 382. C-V-I-F-A/N-L-I-S-A → Empath / Theorist
// 383. C-V-I-F-A/N-L-I-F-H → Empath / Innovator
// 384. C-V-I-F-A/N-L-I-F-A → Empath / Visionary
// 385. C-V-I-F-A/N-V-O-S-H → Empath / Ambassador
// 386. C-V-I-F-A/N-V-O-S-A → Empath / Artist
// 387. C-V-I-F-A/N-V-O-F-H → Empath / Catalyst
// 388. C-V-I-F-A/N-V-O-F-A → Empath / Wanderer
// 389. C-V-I-F-A/N-V-I-S-H → Empath / Mentor
// 390. C-V-I-F-A/N-V-I-S-A → Empath / Sage
// 391. C-V-I-F-A/N-V-I-F-H → Empath / Unifier
// 392. C-V-I-F-A/N-V-I-F-A → Empath / Mystic
// 393. N-L-O-S-H/N-L-O-S-H → Strategist / Strategist
// 394. N-L-O-S-H/N-L-O-S-A → Strategist / Inventor
// 395. N-L-O-S-H/N-L-O-F-H → Strategist / Disruptor
// 396. N-L-O-S-H/N-L-O-F-A → Strategist / Revolutionary
// 397. N-L-O-S-H/N-L-I-S-H → Strategist / Academic
// 398. N-L-O-S-H/N-L-I-S-A → Strategist / Theorist
// 399. N-L-O-S-H/N-L-I-F-H → Strategist / Innovator
// 400. N-L-O-S-H/N-L-I-F-A → Strategist / Visionary
// 401. N-L-O-S-H/N-V-O-S-H → Strategist / Ambassador
// 402. N-L-O-S-H/N-V-O-S-A → Strategist / Artist
// 403. N-L-O-S-H/N-V-O-F-H → Strategist / Catalyst
// 404. N-L-O-S-H/N-V-O-F-A → Strategist / Wanderer
// 405. N-L-O-S-H/N-V-I-S-H → Strategist / Mentor
// 406. N-L-O-S-H/N-V-I-S-A → Strategist / Sage
// 407. N-L-O-S-H/N-V-I-F-H → Strategist / Unifier
// 408. N-L-O-S-H/N-V-I-F-A → Strategist / Mystic
// 409. N-L-O-S-A/N-L-O-S-A → Inventor / Inventor
// 410. N-L-O-S-A/N-L-O-F-H → Inventor / Disruptor
// 411. N-L-O-S-A/N-L-O-F-A → Inventor / Revolutionary
// 412. N-L-O-S-A/N-L-I-S-H → Inventor / Academic
// 413. N-L-O-S-A/N-L-I-S-A → Inventor / Theorist
// 414. N-L-O-S-A/N-L-I-F-H → Inventor / Innovator
// 415. N-L-O-S-A/N-L-I-F-A → Inventor / Visionary
// 416. N-L-O-S-A/N-V-O-S-H → Inventor / Ambassador
// 417. N-L-O-S-A/N-V-O-S-A → Inventor / Artist
// 418. N-L-O-S-A/N-V-O-F-H → Inventor / Catalyst
// 419. N-L-O-S-A/N-V-O-F-A → Inventor / Wanderer
// 420. N-L-O-S-A/N-V-I-S-H → Inventor / Mentor
// 421. N-L-O-S-A/N-V-I-S-A → Inventor / Sage
// 422. N-L-O-S-A/N-V-I-F-H → Inventor / Unifier
// 423. N-L-O-S-A/N-V-I-F-A → Inventor / Mystic
// 424. N-L-O-F-H/N-L-O-F-H → Disruptor / Disruptor
// 425. N-L-O-F-H/N-L-O-F-A → Disruptor / Revolutionary
// 426. N-L-O-F-H/N-L-I-S-H → Disruptor / Academic
// 427. N-L-O-F-H/N-L-I-S-A → Disruptor / Theorist
// 428. N-L-O-F-H/N-L-I-F-H → Disruptor / Innovator
// 429. N-L-O-F-H/N-L-I-F-A → Disruptor / Visionary
// 430. N-L-O-F-H/N-V-O-S-H → Disruptor / Ambassador
// 431. N-L-O-F-H/N-V-O-S-A → Disruptor / Artist
// 432. N-L-O-F-H/N-V-O-F-H → Disruptor / Catalyst
// 433. N-L-O-F-H/N-V-O-F-A → Disruptor / Wanderer
// 434. N-L-O-F-H/N-V-I-S-H → Disruptor / Mentor
// 435. N-L-O-F-H/N-V-I-S-A → Disruptor / Sage
// 436. N-L-O-F-H/N-V-I-F-H → Disruptor / Unifier
// 437. N-L-O-F-H/N-V-I-F-A → Disruptor / Mystic
// 438. N-L-O-F-A/N-L-O-F-A → Revolutionary / Revolutionary
// 439. N-L-O-F-A/N-L-I-S-H → Revolutionary / Academic
// 440. N-L-O-F-A/N-L-I-S-A → Revolutionary / Theorist
// 441. N-L-O-F-A/N-L-I-F-H → Revolutionary / Innovator
// 442. N-L-O-F-A/N-L-I-F-A → Revolutionary / Visionary
// 443. N-L-O-F-A/N-V-O-S-H → Revolutionary / Ambassador
// 444. N-L-O-F-A/N-V-O-S-A → Revolutionary / Artist
// 445. N-L-O-F-A/N-V-O-F-H → Revolutionary / Catalyst
// 446. N-L-O-F-A/N-V-O-F-A → Revolutionary / Wanderer
// 447. N-L-O-F-A/N-V-I-S-H → Revolutionary / Mentor
// 448. N-L-O-F-A/N-V-I-S-A → Revolutionary / Sage
// 449. N-L-O-F-A/N-V-I-F-H → Revolutionary / Unifier
// 450. N-L-O-F-A/N-V-I-F-A → Revolutionary / Mystic
// 451. N-L-I-S-H/N-L-I-S-H → Academic / Academic
// 452. N-L-I-S-H/N-L-I-S-A → Academic / Theorist
// 453. N-L-I-S-H/N-L-I-F-H → Academic / Innovator
// 454. N-L-I-S-H/N-L-I-F-A → Academic / Visionary
// 455. N-L-I-S-H/N-V-O-S-H → Academic / Ambassador
// 456. N-L-I-S-H/N-V-O-S-A → Academic / Artist
// 457. N-L-I-S-H/N-V-O-F-H → Academic / Catalyst
// 458. N-L-I-S-H/N-V-O-F-A → Academic / Wanderer
// 459. N-L-I-S-H/N-V-I-S-H → Academic / Mentor
// 460. N-L-I-S-H/N-V-I-S-A → Academic / Sage
// 461. N-L-I-S-H/N-V-I-F-H → Academic / Unifier
// 462. N-L-I-S-H/N-V-I-F-A → Academic / Mystic
// 463. N-L-I-S-A/N-L-I-S-A → Theorist / Theorist
// 464. N-L-I-S-A/N-L-I-F-H → Theorist / Innovator
// 465. N-L-I-S-A/N-L-I-F-A → Theorist / Visionary
// 466. N-L-I-S-A/N-V-O-S-H → Theorist / Ambassador
// 467. N-L-I-S-A/N-V-O-S-A → Theorist / Artist
// 468. N-L-I-S-A/N-V-O-F-H → Theorist / Catalyst
// 469. N-L-I-S-A/N-V-O-F-A → Theorist / Wanderer
// 470. N-L-I-S-A/N-V-I-S-H → Theorist / Mentor
// 471. N-L-I-S-A/N-V-I-S-A → Theorist / Sage
// 472. N-L-I-S-A/N-V-I-F-H → Theorist / Unifier
// 473. N-L-I-S-A/N-V-I-F-A → Theorist / Mystic
// 474. N-L-I-F-H/N-L-I-F-H → Innovator / Innovator
// 475. N-L-I-F-H/N-L-I-F-A → Innovator / Visionary
// 476. N-L-I-F-H/N-V-O-S-H → Innovator / Ambassador
// 477. N-L-I-F-H/N-V-O-S-A → Innovator / Artist
// 478. N-L-I-F-H/N-V-O-F-H → Innovator / Catalyst
// 479. N-L-I-F-H/N-V-O-F-A → Innovator / Wanderer
// 480. N-L-I-F-H/N-V-I-S-H → Innovator / Mentor
// 481. N-L-I-F-H/N-V-I-S-A → Innovator / Sage
// 482. N-L-I-F-H/N-V-I-F-H → Innovator / Unifier
// 483. N-L-I-F-H/N-V-I-F-A → Innovator / Mystic
// 484. N-L-I-F-A/N-L-I-F-A → Visionary / Visionary
// 485. N-L-I-F-A/N-V-O-S-H → Visionary / Ambassador
// 486. N-L-I-F-A/N-V-O-S-A → Visionary / Artist
// 487. N-L-I-F-A/N-V-O-F-H → Visionary / Catalyst
// 488. N-L-I-F-A/N-V-O-F-A → Visionary / Wanderer
// 489. N-L-I-F-A/N-V-I-S-H → Visionary / Mentor
// 490. N-L-I-F-A/N-V-I-S-A → Visionary / Sage
// 491. N-L-I-F-A/N-V-I-F-H → Visionary / Unifier
// 492. N-L-I-F-A/N-V-I-F-A → Visionary / Mystic
// 493. N-V-O-S-H/N-V-O-S-H → Ambassador / Ambassador
// 494. N-V-O-S-H/N-V-O-S-A → Ambassador / Artist
// 495. N-V-O-S-H/N-V-O-F-H → Ambassador / Catalyst
// 496. N-V-O-S-H/N-V-O-F-A → Ambassador / Wanderer
// 497. N-V-O-S-H/N-V-I-S-H → Ambassador / Mentor
// 498. N-V-O-S-H/N-V-I-S-A → Ambassador / Sage
// 499. N-V-O-S-H/N-V-I-F-H → Ambassador / Unifier
// 500. N-V-O-S-H/N-V-I-F-A → Ambassador / Mystic
// 501. N-V-O-S-A/N-V-O-S-A → Artist / Artist
// 502. N-V-O-S-A/N-V-O-F-H → Artist / Catalyst
// 503. N-V-O-S-A/N-V-O-F-A → Artist / Wanderer
// 504. N-V-O-S-A/N-V-I-S-H → Artist / Mentor
// 505. N-V-O-S-A/N-V-I-S-A → Artist / Sage
// 506. N-V-O-S-A/N-V-I-F-H → Artist / Unifier
// 507. N-V-O-S-A/N-V-I-F-A → Artist / Mystic
// 508. N-V-O-F-H/N-V-O-F-H → Catalyst / Catalyst
// 509. N-V-O-F-H/N-V-O-F-A → Catalyst / Wanderer
// 510. N-V-O-F-H/N-V-I-S-H → Catalyst / Mentor
// 511. N-V-O-F-H/N-V-I-S-A → Catalyst / Sage
// 512. N-V-O-F-H/N-V-I-F-H → Catalyst / Unifier
// 513. N-V-O-F-H/N-V-I-F-A → Catalyst / Mystic
// 514. N-V-O-F-A/N-V-O-F-A → Wanderer / Wanderer
// 515. N-V-O-F-A/N-V-I-S-H → Wanderer / Mentor
// 516. N-V-O-F-A/N-V-I-S-A → Wanderer / Sage
// 517. N-V-O-F-A/N-V-I-F-H → Wanderer / Unifier
// 518. N-V-O-F-A/N-V-I-F-A → Wanderer / Mystic
// 519. N-V-I-S-H/N-V-I-S-H → Mentor / Mentor
// 520. N-V-I-S-H/N-V-I-S-A → Mentor / Sage
// 521. N-V-I-S-H/N-V-I-F-H → Mentor / Unifier
// 522. N-V-I-S-H/N-V-I-F-A → Mentor / Mystic
// 523. N-V-I-S-A/N-V-I-S-A → Sage / Sage
// 524. N-V-I-S-A/N-V-I-F-H → Sage / Unifier
// 525. N-V-I-S-A/N-V-I-F-A → Sage / Mystic
// 526. N-V-I-F-H/N-V-I-F-H → Unifier / Unifier
// 527. N-V-I-F-H/N-V-I-F-A → Unifier / Mystic
// 528. N-V-I-F-A/N-V-I-F-A → Mystic / Mystic

//["C-L-O-S-H/C-L-O-S-H","C-L-O-S-H/C-L-O-S-A","C-L-O-S-H/C-L-O-F-H","C-L-O-S-H/C-L-O-F-A","C-L-O-S-H/C-L-I-S-H","C-L-O-S-H/C-L-I-S-A","C-L-O-S-H/C-L-I-F-H","C-L-O-S-H/C-L-I-F-A","C-L-O-S-H/C-V-O-S-H","C-L-O-S-H/C-V-O-S-A","C-L-O-S-H/C-V-O-F-H","C-L-O-S-H/C-V-O-F-A","C-L-O-S-H/C-V-I-S-H","C-L-O-S-H/C-V-I-S-A","C-L-O-S-H/C-V-I-F-H","C-L-O-S-H/C-V-I-F-A","C-L-O-S-H/N-L-O-S-H","C-L-O-S-H/N-L-O-S-A","C-L-O-S-H/N-L-O-F-H","C-L-O-S-H/N-L-O-F-A","C-L-O-S-H/N-L-I-S-H","C-L-O-S-H/N-L-I-S-A","C-L-O-S-H/N-L-I-F-H","C-L-O-S-H/N-L-I-F-A","C-L-O-S-H/N-V-O-S-H","C-L-O-S-H/N-V-O-S-A","C-L-O-S-H/N-V-O-F-H","C-L-O-S-H/N-V-O-F-A","C-L-O-S-H/N-V-I-S-H","C-L-O-S-H/N-V-I-S-A","C-L-O-S-H/N-V-I-F-H","C-L-O-S-H/N-V-I-F-A","C-L-O-S-A/C-L-O-S-A","C-L-O-S-A/C-L-O-F-H","C-L-O-S-A/C-L-O-F-A","C-L-O-S-A/C-L-I-S-H","C-L-O-S-A/C-L-I-S-A","C-L-O-S-A/C-L-I-F-H","C-L-O-S-A/C-L-I-F-A","C-L-O-S-A/C-V-O-S-H","C-L-O-S-A/C-V-O-S-A","C-L-O-S-A/C-V-O-F-H","C-L-O-S-A/C-V-I-S-H","C-L-O-S-A/C-V-I-S-A","C-L-O-S-A/C-V-I-F-H","C-L-O-S-A/C-V-I-F-A","C-L-O-S-A/N-L-O-S-H","C-L-O-S-A/N-L-O-S-A","C-L-O-S-A/N-L-O-F-H","C-L-O-S-A/N-L-O-F-A","C-L-O-S-A/N-L-I-S-H","C-L-O-S-A/N-L-I-S-A","C-L-O-S-A/N-L-I-F-H","C-L-O-S-A/N-L-I-F-A","C-L-O-S-A/N-V-O-S-H","C-L-O-S-A/N-V-O-S-A","C-L-O-S-A/N-V-O-F-H","C-L-O-S-A/N-V-O-F-A","C-L-O-S-A/N-V-I-S-H","C-L-O-S-A/N-V-I-S-A","C-L-O-S-A/N-V-I-F-H","C-L-O-S-A/N-V-I-F-A","C-L-O-F-H/C-L-O-F-H","C-L-O-F-H/C-L-O-F-A","C-L-O-F-H/C-L-I-S-H","C-L-O-F-H/C-L-I-S-A","C-L-O-F-H/C-L-I-F-H","C-L-O-F-H/C-L-I-F-A","C-L-O-F-H/C-V-O-S-H","C-L-O-F-H/C-V-O-S-A","C-L-O-F-H/C-V-O-F-H","C-L-O-F-H/C-V-O-F-A","C-L-O-F-H/C-V-I-S-H","C-L-O-F-H/C-V-I-S-A","C-L-O-F-H/C-V-I-F-H","C-L-O-F-H/C-V-I-F-A","C-L-O-F-H/N-L-O-S-H","C-L-O-F-H/N-L-O-S-A","C-L-O-F-H/N-L-O-F-H","C-L-O-F-H/N-L-O-F-A","C-L-O-F-H/N-L-I-S-H","C-L-O-F-H/N-L-I-S-A","C-L-O-F-H/N-L-I-F-H","C-L-O-F-H/N-L-I-F-A","C-L-O-F-H/N-V-O-S-H","C-L-O-F-H/N-V-O-S-A","C-L-O-F-H/N-V-O-F-H","C-L-O-F-H/N-V-O-F-A","C-L-O-F-H/N-V-I-S-H","C-L-O-F-H/N-V-I-S-A","C-L-O-F-H/N-V-I-F-H","C-L-O-F-H/N-V-I-F-A","C-L-O-F-A/C-L-O-F-A","C-L-O-F-A/C-L-I-S-H","C-L-O-F-A/C-L-I-S-A","C-L-O-F-A/C-L-I-F-H","C-L-O-F-A/C-L-I-F-A","C-L-O-F-A/C-V-O-S-H","C-L-O-F-A/C-V-O-S-A","C-L-O-F-A/C-V-O-F-H","C-L-O-F-A/C-V-O-F-A","C-L-O-F-A/C-V-I-S-H","C-L-O-F-A/C-V-I-S-A","C-L-O-F-A/C-V-I-F-H","C-L-O-F-A/C-V-I-F-A","C-L-O-F-A/N-L-O-S-H","C-L-O-F-A/N-L-O-S-A","C-L-O-F-A/N-L-O-F-H","C-L-O-F-A/N-L-O-F-A","C-L-O-F-A/N-L-I-S-H","C-L-O-F-A/N-L-I-S-A","C-L-O-F-A/N-L-I-F-H","C-L-O-F-A/N-L-I-F-A","C-L-O-F-A/N-V-O-S-H","C-L-O-F-A/N-V-O-S-A","C-L-O-F-A/N-V-O-F-H","C-L-O-F-A/N-V-O-F-A","C-L-O-F-A/N-V-I-S-H","C-L-O-F-A/N-V-I-S-A","C-L-O-F-A/N-V-I-F-H","C-L-O-F-A/N-V-I-F-A","C-L-I-S-H/C-L-I-S-H","C-L-I-S-H/C-L-I-S-A","C-L-I-S-H/C-L-I-F-H","C-L-I-S-H/C-L-I-F-A","C-L-I-S-H/C-V-O-S-H","C-L-I-S-H/C-V-O-S-A","C-L-I-S-H/C-V-O-F-H","C-L-I-S-H/C-V-O-F-A","C-L-I-S-H/C-V-I-S-H","C-L-I-S-H/C-V-I-S-A","C-L-I-S-H/C-V-I-F-H","C-L-I-S-H/C-V-I-F-A","C-L-I-S-H/N-L-O-S-H","C-L-I-S-H/N-L-O-S-A","C-L-I-S-H/N-L-O-F-H","C-L-I-S-H/N-L-O-F-A","C-L-I-S-H/N-L-I-S-H","C-L-I-S-H/N-L-I-S-A","C-L-I-S-H/N-L-I-F-H","C-L-I-S-H/N-L-I-F-A","C-L-I-S-H/N-V-O-S-H","C-L-I-S-H/N-V-O-S-A","C-L-I-S-H/N-V-O-F-H","C-L-I-S-H/N-V-O-F-A","C-L-I-S-H/N-V-I-S-H","C-L-I-S-H/N-V-I-S-A","C-L-I-S-H/N-V-I-F-H","C-L-I-S-H/N-V-I-F-A","C-L-I-S-A/C-L-I-S-A","C-L-I-S-A/C-L-I-F-H","C-L-I-S-A/C-L-I-F-A","C-L-I-S-A/C-V-O-S-H","C-L-I-S-A/C-V-O-S-A","C-L-I-S-A/C-V-O-F-H","C-L-I-S-A/C-V-O-F-A","C-L-I-S-A/C-V-I-S-H","C-L-I-S-A/C-V-I-S-A","C-L-I-S-A/C-V-I-F-H","C-L-I-S-A/C-V-I-F-A","C-L-I-S-A/N-L-O-S-H","C-L-I-S-A/N-L-O-S-A","C-L-I-S-A/N-L-O-F-H","C-L-I-S-A/N-L-O-F-A","C-L-I-S-A/N-L-I-S-H","C-L-I-S-A/N-L-I-S-A","C-L-I-S-A/N-L-I-F-H","C-L-I-S-A/N-L-I-F-A","C-L-I-S-A/N-V-O-S-H","C-L-I-S-A/N-V-O-S-A","C-L-I-S-A/N-V-O-F-H","C-L-I-S-A/N-V-O-F-A","C-L-I-S-A/N-V-I-S-H","C-L-I-S-A/N-V-I-S-A","C-L-I-S-A/N-V-I-F-H","C-L-I-S-A/N-V-I-F-A","C-L-I-F-H/C-L-I-F-H","C-L-I-F-H/C-L-I-F-A","C-L-I-F-H/C-V-O-S-H","C-L-I-F-H/C-V-O-S-A","C-L-I-F-H/C-V-O-F-H","C-L-I-F-H/C-V-O-F-A","C-L-I-F-H/C-V-I-S-H","C-L-I-F-H/C-V-I-S-A","C-L-I-F-H/C-V-I-F-A","C-L-I-F-H/N-L-O-S-H","C-L-I-F-H/N-L-O-S-A","C-L-I-F-H/N-L-O-F-H","C-L-I-F-H/N-L-O-F-A","C-L-I-F-H/N-L-I-S-H","C-L-I-F-H/N-L-I-S-A","C-L-I-F-H/N-L-I-F-H","C-L-I-F-H/N-L-I-F-A","C-L-I-F-H/N-V-O-S-H","C-L-I-F-H/N-V-O-S-A","C-L-I-F-H/N-V-O-F-H","C-L-I-F-H/N-V-O-F-A","C-L-I-F-H/N-V-I-S-H","C-L-I-F-H/N-V-I-S-A","C-L-I-F-H/N-V-I-F-H","C-L-I-F-H/N-V-I-F-A","C-L-I-F-A/C-L-I-F-A","C-L-I-F-A/C-V-O-S-H","C-L-I-F-A/C-V-O-S-A","C-L-I-F-A/C-V-O-F-H","C-L-I-F-A/C-V-O-F-A","C-L-I-F-A/C-V-I-S-H","C-L-I-F-A/C-V-I-S-A","C-L-I-F-A/C-V-I-F-H","C-L-I-F-A/C-V-I-F-A","C-L-I-F-A/N-L-O-S-H","C-L-I-F-A/N-L-O-S-A","C-L-I-F-A/N-L-O-F-H","C-L-I-F-A/N-L-O-F-A","C-L-I-F-A/N-L-I-S-H","C-L-I-F-A/N-L-I-S-A","C-L-I-F-A/N-L-I-F-H","C-L-I-F-A/N-L-I-F-A","C-L-I-F-A/N-V-O-S-H","C-L-I-F-A/N-V-O-S-A","C-L-I-F-A/N-V-O-F-H","C-L-I-F-A/N-V-O-F-A","C-L-I-F-A/N-V-I-S-H","C-L-I-F-A/N-V-I-S-A","C-L-I-F-A/N-V-I-F-A","C-V-O-S-H/C-V-O-S-H","C-V-O-S-H/C-V-O-S-A","C-V-O-S-H/C-V-O-F-H","C-V-O-S-H/C-V-O-F-A","C-V-O-S-H/C-V-I-S-H","C-V-O-S-H/C-V-I-S-A","C-V-O-S-H/C-V-I-F-H","C-V-O-S-H/C-V-I-F-A","C-V-O-S-H/N-L-O-S-A","C-V-O-S-H/N-L-O-F-H","C-V-O-S-H/N-L-O-F-A","C-V-O-S-H/N-L-I-S-H","C-V-O-S-H/N-L-I-S-A","C-V-O-S-H/N-L-I-F-H","C-V-O-S-H/N-L-I-F-A","C-V-O-S-H/N-V-O-S-H","C-V-O-S-H/N-V-O-S-A","C-V-O-S-H/N-V-O-F-H","C-V-O-S-H/N-V-O-F-A","C-V-O-S-H/N-V-I-S-H","C-V-O-S-H/N-V-I-S-A","C-V-O-S-H/N-V-I-F-H","C-V-O-S-H/N-V-I-F-A","C-V-O-S-A/C-V-O-S-A","C-V-O-S-A/C-V-O-F-H","C-V-O-S-A/C-V-O-F-A","C-V-O-S-A/C-V-I-S-H","C-V-O-S-A/C-V-I-F-A","C-V-O-S-A/N-L-O-S-H","C-V-O-S-A/N-L-O-S-A","C-V-O-S-A/N-L-O-F-H","C-V-O-S-A/N-L-O-F-A","C-V-O-S-A/N-L-I-S-H","C-V-O-S-A/N-L-I-S-A","C-V-O-S-A/N-L-I-F-H","C-V-O-S-A/N-L-I-F-A","C-V-O-S-A/N-V-O-S-H","C-V-O-S-A/N-V-O-S-A","C-V-O-S-A/N-V-O-F-H","C-V-O-S-A/N-V-O-F-A","C-V-O-S-A/N-V-I-S-H","C-V-O-S-A/N-V-I-S-A","C-V-O-S-A/N-V-I-F-H","C-V-O-S-A/N-V-I-F-A","C-V-O-F-H/C-V-O-F-H","C-V-O-F-H/C-V-O-F-A","C-V-O-F-H/C-V-I-S-H","C-V-O-F-H/C-V-I-S-A","C-V-O-F-H/C-V-I-F-H","C-V-O-F-H/C-V-I-F-A","C-V-O-F-H/N-L-O-S-H","C-V-O-F-H/N-L-O-S-A","C-V-O-F-H/N-L-O-F-H","C-V-O-F-H/N-L-O-F-A","C-V-O-F-H/N-L-I-S-H","C-V-O-F-H/N-L-I-S-A","C-V-O-F-H/N-L-I-F-H","C-V-O-F-H/N-L-I-F-A","C-V-O-F-H/N-V-O-S-H","C-V-O-F-H/N-V-O-S-A","C-V-O-F-H/N-V-O-F-H","C-V-O-F-H/N-V-O-F-A","C-V-O-F-H/N-V-I-S-H","C-V-O-F-H/N-V-I-S-A","C-V-O-F-H/N-V-I-F-H","C-V-O-F-H/N-V-I-F-A","C-V-O-F-A/C-V-O-F-A","C-V-O-F-A/C-V-I-S-H","C-V-O-F-A/C-V-I-S-A","C-V-O-F-A/C-V-I-F-H","C-V-O-F-A/C-V-I-F-A","C-V-O-F-A/N-L-O-S-H","C-V-O-F-A/N-L-O-S-A","C-V-O-F-A/N-L-O-F-H","C-V-O-F-A/N-L-O-F-A","C-V-O-F-A/N-L-I-S-H","C-V-O-F-A/N-L-I-S-A","C-V-O-F-A/N-L-I-F-H","C-V-O-F-A/N-L-I-F-A","C-V-O-F-A/N-V-O-S-H","C-V-O-F-A/N-V-O-S-A","C-V-O-F-A/N-V-O-F-H","C-V-O-F-A/N-V-O-F-A","C-V-O-F-A/N-V-I-S-H","C-V-O-F-A/N-V-I-S-A","C-V-O-F-A/N-V-I-F-H","C-V-O-F-A/N-V-I-F-A","C-V-I-S-H/C-V-I-S-H","C-V-I-S-H/C-V-I-S-A","C-V-I-S-H/C-V-I-F-H","C-V-I-S-H/C-V-I-F-A","C-V-I-S-H/N-L-O-S-H","C-V-I-S-H/N-L-O-S-A","C-V-I-S-H/N-L-O-F-H","C-V-I-S-H/N-L-O-F-A","C-V-I-S-H/N-L-I-S-H","C-V-I-S-H/N-L-I-S-A","C-V-I-S-H/N-L-I-F-H","C-V-I-S-H/N-L-I-F-A","C-V-I-S-H/N-V-O-S-H","C-V-I-S-H/N-V-O-S-A","C-V-I-S-H/N-V-O-F-H","C-V-I-S-H/N-V-O-F-A","C-V-I-S-H/N-V-I-S-H","C-V-I-S-H/N-V-I-S-A","C-V-I-S-H/N-V-I-F-H","C-V-I-S-H/N-V-I-F-A","C-V-I-S-A/C-V-I-S-A","C-V-I-S-A/C-V-I-F-H","C-V-I-S-A/C-V-I-F-A","C-V-I-S-A/N-L-O-S-H","C-V-I-S-A/N-L-O-S-A","C-V-I-S-A/N-L-O-F-H","C-V-I-S-A/N-L-O-F-A","C-V-I-S-A/N-L-I-S-H","C-V-I-S-A/N-L-I-S-A","C-V-I-S-A/N-L-I-F-H","C-V-I-S-A/N-L-I-F-A","C-V-I-S-A/N-V-O-S-H","C-V-I-S-A/N-V-O-S-A","C-V-I-S-A/N-V-O-F-H","C-V-I-S-A/N-V-O-F-A","C-V-I-S-A/N-V-I-S-H","C-V-I-S-A/N-V-I-S-A","C-V-I-S-A/N-V-I-F-H","C-V-I-S-A/N-V-I-F-A","C-V-I-F-H/C-V-I-F-H","C-V-I-F-H/C-V-I-F-A","C-V-I-F-H/N-L-O-S-A","C-V-I-F-H/N-L-O-F-H","C-V-I-F-H/N-L-O-F-A","C-V-I-F-H/N-L-I-S-H","C-V-I-F-H/N-L-I-S-A","C-V-I-F-H/N-L-I-F-H","C-V-I-F-H/N-L-I-F-A","C-V-I-F-H/N-V-O-S-H","C-V-I-F-H/N-V-O-S-A","C-V-I-F-H/N-V-O-F-H","C-V-I-F-H/N-V-O-F-A","C-V-I-F-H/N-V-I-S-H","C-V-I-F-H/N-V-I-S-A","C-V-I-F-H/N-V-I-F-H","C-V-I-F-H/N-V-I-F-A","C-V-I-F-A/C-V-I-F-A","C-V-I-F-A/N-L-O-S-H","C-V-I-F-A/N-L-O-S-A","C-V-I-F-A/N-L-O-F-H","C-V-I-F-A/N-L-O-F-A","C-V-I-F-A/N-L-I-S-H","C-V-I-F-A/N-L-I-S-A","C-V-I-F-A/N-L-I-F-H","C-V-I-F-A/N-L-I-F-A","C-V-I-F-A/N-V-O-S-H","C-V-I-F-A/N-V-O-S-A","C-V-I-F-A/N-V-O-F-H","C-V-I-F-A/N-V-O-F-A","C-V-I-F-A/N-V-I-S-H","C-V-I-F-A/N-V-I-S-A","C-V-I-F-A/N-V-I-F-H","C-V-I-F-A/N-V-I-F-A","N-L-O-S-H/N-L-O-S-H","N-L-O-S-H/N-L-O-S-A","N-L-O-S-H/N-L-O-F-H","N-L-O-S-H/N-L-O-F-A","N-L-O-S-H/N-L-I-S-H","N-L-O-S-H/N-L-I-S-A","N-L-O-S-H/N-L-I-F-H","N-L-O-S-H/N-L-I-F-A","N-L-O-S-H/N-V-O-S-H","N-L-O-S-H/N-V-O-S-A","N-L-O-S-H/N-V-O-F-H","N-L-O-S-H/N-V-O-F-A","N-L-O-S-H/N-V-I-S-H","N-L-O-S-H/N-V-I-S-A","N-L-O-S-H/N-V-I-F-H","N-L-O-S-H/N-V-I-F-A","N-L-O-S-A/N-L-O-S-A","N-L-O-S-A/N-L-O-F-H","N-L-O-S-A/N-L-O-F-A","N-L-O-S-A/N-L-I-S-H","N-L-O-S-A/N-L-I-S-A","N-L-O-S-A/N-L-I-F-H","N-L-O-S-A/N-L-I-F-A","N-L-O-S-A/N-V-O-S-H","N-L-O-S-A/N-V-O-S-A","N-L-O-S-A/N-V-O-F-A","N-L-O-S-A/N-V-I-S-H","N-L-O-S-A/N-V-I-S-A","N-L-O-S-A/N-V-I-F-H","N-L-O-S-A/N-V-I-F-A","N-L-O-F-H/N-L-O-F-H","N-L-O-F-H/N-L-O-F-A","N-L-O-F-H/N-L-I-S-H","N-L-O-F-H/N-L-I-S-A","N-L-O-F-H/N-L-I-F-H","N-L-O-F-H/N-L-I-F-A","N-L-O-F-H/N-V-O-S-H","N-L-O-F-H/N-V-O-S-A","N-L-O-F-H/N-V-O-F-H","N-L-O-F-H/N-V-O-F-A","N-L-O-F-H/N-V-I-S-H","N-L-O-F-H/N-V-I-S-A","N-L-O-F-H/N-V-I-F-H","N-L-O-F-H/N-V-I-F-A","N-L-O-F-A/N-L-O-F-A","N-L-O-F-A/N-L-I-S-H","N-L-O-F-A/N-L-I-S-A","N-L-O-F-A/N-L-I-F-H","N-L-O-F-A/N-L-I-F-A","N-L-O-F-A/N-V-O-S-H","N-L-O-F-A/N-V-O-S-A","N-L-O-F-A/N-V-O-F-H","N-L-O-F-A/N-V-O-F-A","N-L-O-F-A/N-V-I-S-H","N-L-O-F-A/N-V-I-S-A","N-L-O-F-A/N-V-I-F-H","N-L-O-F-A/N-V-I-F-A","N-L-I-S-H/N-L-I-S-H","N-L-I-S-H/N-L-I-S-A","N-L-I-S-H/N-L-I-F-H","N-L-I-S-H/N-L-I-F-A","N-L-I-S-H/N-V-O-S-H","N-L-I-S-H/N-V-O-S-A","N-L-I-S-H/N-V-O-F-H","N-L-I-S-H/N-V-O-F-A","N-L-I-S-H/N-V-I-S-H","N-L-I-S-H/N-V-I-S-A","N-L-I-S-H/N-V-I-F-H","N-L-I-S-H/N-V-I-F-A","N-L-I-S-A/N-L-I-S-A","N-L-I-S-A/N-L-I-F-H","N-L-I-S-A/N-L-I-F-A","N-L-I-S-A/N-V-O-S-H","N-L-I-S-A/N-V-O-S-A","N-L-I-S-A/N-V-O-F-H","N-L-I-S-A/N-V-O-F-A","N-L-I-S-A/N-V-I-S-H","N-L-I-S-A/N-V-I-S-A","N-L-I-S-A/N-V-I-F-H","N-L-I-S-A/N-V-I-F-A","N-L-I-F-H/N-L-I-F-H","N-L-I-F-H/N-L-I-F-A","N-L-I-F-H/N-V-O-S-H","N-L-I-F-H/N-V-O-S-A","N-L-I-F-H/N-V-O-F-H","N-L-I-F-H/N-V-O-F-A","N-L-I-F-H/N-V-I-S-H","N-L-I-F-H/N-V-I-S-A","N-L-I-F-H/N-V-I-F-H","N-L-I-F-H/N-V-I-F-A","N-L-I-F-A/N-L-I-F-A","N-L-I-F-A/N-V-O-S-H","N-L-I-F-A/N-V-O-S-A","N-L-I-F-A/N-V-O-F-H","N-L-I-F-A/N-V-O-F-A","N-L-I-F-A/N-V-I-S-H","N-L-I-F-A/N-V-I-S-A","N-L-I-F-A/N-V-I-F-H","N-L-I-F-A/N-V-I-F-A","N-V-O-S-H/N-V-O-S-H","N-V-O-S-H/N-V-O-S-A","N-V-O-S-H/N-V-O-F-H","N-V-O-S-H/N-V-O-F-A","N-V-O-S-H/N-V-I-S-H","N-V-O-S-H/N-V-I-S-A","N-V-O-S-H/N-V-I-F-H","N-V-O-S-H/N-V-I-F-A","N-V-O-S-A/N-V-O-S-A","N-V-O-S-A/N-V-O-F-H","N-V-O-S-A/N-V-O-F-A","N-V-O-S-A/N-V-I-S-H","N-V-O-S-A/N-V-I-S-A","N-V-O-S-A/N-V-I-F-H","N-V-O-S-A/N-V-I-F-A","N-V-O-F-H/N-V-O-F-H","N-V-O-F-H/N-V-O-F-A","N-V-O-F-H/N-V-I-S-H","N-V-O-F-H/N-V-I-S-A","N-V-O-F-H/N-V-I-F-H","N-V-O-F-H/N-V-I-F-A","N-V-O-F-A/N-V-O-F-A","N-V-O-F-A/N-V-I-S-H","N-V-O-F-A/N-V-I-S-A","N-V-O-F-A/N-V-I-F-H","N-V-O-F-A/N-V-I-F-A","N-V-I-S-H/N-V-I-S-H","N-V-I-S-H/N-V-I-S-A","N-V-I-S-H/N-V-I-F-H","N-V-I-S-H/N-V-I-F-A","N-V-I-S-A/N-V-I-S-A","N-V-I-S-A/N-V-I-F-H","N-V-I-S-A/N-V-I-F-A","N-V-I-F-H/N-V-I-F-H","N-V-I-F-H/N-V-I-F-A","N-V-I-F-A/N-V-I-F-A"]
