package com.timecat.module.vge.core;

import android.content.Context;

import com.badlogic.gdx.Files.FileType;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.files.FileHandle;
import com.timecat.module.vge.pokedroid.input.midi.MidiPlayer;

import java.io.IOException;
import java.io.InputStream;

public class AndroidMidiPlayer implements MidiPlayer {
	
	private Music m;
	private FileHandle file;

	public AndroidMidiPlayer(Context context) {
		
	}

	public void open(String fileName, FileType type) {
		
	}
	
	@Override
	public void open(InputStream is) throws IOException {
		
	}

	//TODO: This should probably be replaced with something better.
	//I had to reset the player to avoid error when
	//opening a second midi file.
	private void reset() {
		
	}
	
	public boolean isLooping() {
		return false;
	}

	public void setLooping(boolean loop) {
		
	}

	public void play() {
		
	}

	public void pause() {
		
	}

	public void stop() {
		
	}

	public void release() {
		
	}

	public boolean isPlaying() {
		return false;
	}

	public void setVolume(float volume) {
		
	}

}