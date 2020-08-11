import asyncio
import websockets

file_path ='logs.txt'

async def get_infos(websocket, path):
    async for message in websocket:
    	with open(file_path, "w") as output_file:
    		output_file.write(message + "\n")
       

start_server = websockets.serve(get_infos, "localhost", 9090)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
