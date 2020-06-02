from lxml import html
from bs4 import BeautifulSoup
import requests

def webscraping():
    page = requests.get('https://www.tempo.pt/lisboa.htm')
    tree = html.fromstring(page.content)
    temp = tree.xpath('/html/body/main/span[1]/span/span[1]/span[4]/span[2]/text()')
    return temp


    # page = requests.get('http://econpy.pythonanywhere.com/ex/001.html')
    # tree = html.fromstring(page.content)

    # #This will create a list of buyers:
    # buyers = tree.xpath('//div[@title="buyer-name"]/text()')
    # #This will create a list of prices
    # prices = tree.xpath('//span[@class="item-price"]/text()')

def steamplayers():
    page = requests.get('https://store.steampowered.com/stats/Steam-Game-and-Player-Statistics')
    tree = html.fromstring(page.content)
    temp = tree.xpath('//*[@class="statsTopHi"]/text()')
    return temp
    
def noticias_minuto():
    noticias = []
    page = requests.get("https://www.noticiasaominuto.com/").text
    soup = BeautifulSoup(page, 'lxml')
    lista = soup.find_all('div', class_='article-thumb-block')
    for i in range(4):
        noticias.append([
            lista[i].find('div', class_="article-thumb-img").img["lazy-src"],
            lista[i].find("p", class_="article-thumb-text").a.text.strip(),
            lista[i].find("p", class_="article-thumb-text").a["href"]])
    return noticias

def covid():
    page = requests.get("https://www.noticiasaominuto.com/dossiers/coronavirus").text
    soup = BeautifulSoup(page, 'lxml')
    table2 = soup.find('div', class_='covid19-widget')
    table = table2.find_all('td')

    data = {
        "PConfirmados": table[0].text.strip(),
        "PRecuperados": table[1].text.strip(),
        "PObitos": table[2].text.strip(),
        "MConfirmados": table[3].text.strip(),
        "MRecuperados": table[4].text.strip(),
        "MObitos": table[5].text.strip()
        }

    return data