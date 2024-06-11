import os

from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import Bot, Dispatcher, Router
import asyncio
from get_text_horoscope import get_text_horoscope
from dotenv import load_dotenv

router: Router = Router()
PROXY_URL = "http://proxy.server:3128"

def get_zodiac_keyboard():
    keyboard_builder = InlineKeyboardBuilder()
    keyboard_builder.button(text='Овен', callback_data='aries')
    keyboard_builder.button(text='Телец', callback_data='taurus')
    keyboard_builder.button(text='Близнецы', callback_data='gemini')
    keyboard_builder.button(text='Рак', callback_data='cancer')
    keyboard_builder.button(text='Лев', callback_data='leo')
    keyboard_builder.button(text='Дева', callback_data='virgo')
    keyboard_builder.button(text='Весы', callback_data='libra')
    keyboard_builder.button(text='Скорпион', callback_data='scorpio')
    keyboard_builder.button(text='Стрелец', callback_data='sagittarius')
    keyboard_builder.button(text='Козерог', callback_data='capricorn')
    keyboard_builder.button(text='Водолей', callback_data='aquarius')
    keyboard_builder.button(text='Рыба', callback_data='pisces')
    keyboard_builder.adjust(3)
    return keyboard_builder.as_markup()


@router.message(CommandStart())
async def start_command(message: Message):
    await message.answer(text='Привет. Выбери свой знак задиака: ', reply_markup=get_zodiac_keyboard())


@router.callback_query()
async def get_horoscope(call: CallbackQuery):
    await call.answer()
    zodiac = call.data
    text = await get_text_horoscope(zodiac=zodiac)
    await call.message.edit_text(text=text, reply_markup=get_zodiac_keyboard())

load_dotenv()


async def start():
    bot: Bot = Bot(token=os.environ.get('TOKEN'), proxy=PROXY_URL)

    dp: Dispatcher = Dispatcher()

    dp.include_router(router=router)

    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


if __name__ == '__main__':
    asyncio.run(start())

