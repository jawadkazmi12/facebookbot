# -*- coding: utf-8 -*-
"""
Created on Mon Dec 1 04:06 2019

@author: Syed Jawad Kazmi Founder of (www.TechCybero.com)

Vist Techcybero.com for Latest Tech and Cyber News.

Fiverr Profile: www.fiverr.com/jawadesigns
"""
# Kindly Read the comments to understand the crawler/bot/scraper script. This is an automated scraper script

# Importing Required Libraries

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
from selenium.common.exceptions import ElementClickInterceptedException
from selenium.common.exceptions import NoSuchElementException
import re
import tkinter as tk
from selenium.webdriver.common.keys import Keys
import os

# Website from which we Scrape Data

class DarkSpider:
    
      
    def crawl(self):
    
        x1 = self.entry1.get()
        self.root.destroy()
        
        driver = webdriver.Chrome(ChromeDriverManager().install())
        #chrome_options = webdriver.ChromeOptions()
        #prefs = {"profile.default_content_setting_values.notifications" : 2}
        #chrome_options.add_experimental_option("prefs",prefs)
        
        # Here Replace the ChromeDriver Path according to your PC in the Below line.
        
        #driver = webdriver.Chrome(executable_path=r"C:\Users\Kazmi\Downloads\Compressed\chromedriver_win32\chromedriver", chrome_options=chrome_options)
        driver.get("https://www.dublinairport.com/flight-information/live-arrivals")
        sleep(2)

        flight_number_input = driver.find_element_by_xpath("//section[@class='flight-list-header']//div[@class='search']//div[@class='form-group search-flights']//input")
        flight_number_input.send_keys(x1)
        
        driver.find_element_by_tag_name('html').send_keys(Keys.ENTER)
        sleep(2)
        
        driver.find_element_by_tag_name('html').send_keys(Keys.PAGE_DOWN)
        sleep(2)

        
        flight_click = driver.find_element_by_xpath("//main[@id='main-content']//div[@class='container time-container arrival-list']//div[@class='flight-list']//table//tbody[@id='flight-list']//tr//td[8]//a")
        flight_click.click()
        sleep(2)
        
        driver.find_element_by_tag_name('html').send_keys(Keys.PAGE_DOWN)
        sleep(2)

        driver.find_element_by_tag_name('html').send_keys(Keys.PAGE_UP)
        sleep(2)
        
        location = driver.find_element_by_xpath("//section[@class='flight-details-header']//div[@class='container']//h2").text
        
        status = driver.find_element_by_xpath("//section[@class='flight-details-header']//div[@class='container']//div[@class='info-list']//span[3]").text
        
        print (location + "\n\n" + status)
        
        sleep(1)
        
        flight_information = driver.find_element_by_xpath("//section[@class='flight-details-header']//div[@class='container']//div[@class='row']//div[1]").text    
        print(flight_information)
        
        driver.close()

    # Main
        
    def initiateCrawler(self):
        self.root= tk.Tk()

        canvas1 = tk.Canvas(self.root, width = 400, height = 300, bg = "green")
        canvas1.pack()

        label3 = tk.Label(self.root, text='AUTOMATED FLIGHT INFORMATION BOT')
        label3.config(font=('helvetica', 14))
        canvas1.create_window(200, 45, window=label3)

        label1 = tk.Label(self.root, text='Enter Flight Number to Get Information')
        label1.config(font=('helvetica', 14))
        canvas1.create_window(200, 90, window=label1)

        self.entry1 = tk.Entry (self.root)

        label2 = tk.Label(self.root, text='Flight Number')
        label2.config(font=('helvetica', 10))
        canvas1.create_window(200, 130, window=label2) 
        canvas1.create_window(200, 160, window=self.entry1)


        button1 = tk.Button(text='Submit', command=self.crawl, bg='brown', fg='white', font=('helvetica', 9, 'bold'))
        canvas1.create_window(200, 200, window=button1)

        label9 = tk.Label(self.root, text='Developed by jawadesigns  @Fiverr.com')
        label9.config(font=('helvetica', 8))
        canvas1.create_window(200, 270, window=label9)

        self.root.mainloop()

